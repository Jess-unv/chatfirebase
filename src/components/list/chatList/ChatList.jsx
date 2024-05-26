import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userschats", currentUser.id), async (res) => {
            const data = res.data();
            if (data && data.chats) { // Verifica si 'chats' está presente en los datos
                const items = data.chats;

                const promises = items.map(async (item) => {
                    if (item && item.receiverId) { // Verifica si item y receiverId no son undefined
                        try {
                            const userDocRef = doc(db, 'users', item.receiverId);
                            const userDocSnap = await getDoc(userDocRef);
                            const user = userDocSnap.data();
                            return { ...item, user };
                        } catch (error) {
                            console.error("Error fetching user document:", error);
                            return null; // O maneja este caso de otra manera según tu lógica
                        }
                    } else {
                        console.log("receiverId es undefined para un item:", item);
                        return null; // O maneja este caso de otra manera según tu lógica
                    }
                });

                const chatData = (await Promise.all(promises)).filter(item => item !== null);

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            } else {
                // Manejo para cuando 'chats' no está presente en los datos
                console.log("La propiedad 'chats' no está presente en los datos.");
            }
        });

        return () => {
            unsub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, 'userschats', currentUser.id);

        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            });
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className='chatList'>
            <div className='search'>
                <div className='searchBar'>
                    <img src='./search.png' alt=''/>
                    <input type='text' placeholder='Search' onChange={(e) => setInput(e.target.value)}/>
                </div>
                <img src={addMode ? "./minus.png": './plus.png'} alt='' className='add' onClick={() => setAddMode(!addMode)}/>
            </div>
            {filteredChats.map(chat => (
                <div className='item' key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat?.isSeen ? 'transparent': '' }}>
                    <img src={chat.user.blocked.includes(currentUser.id)? './avatar.png': chat.user.avatar || './avatar.png'} alt=''/>
                    <div className='texts'>
                        <span>{chat.user.blocked.includes(currentUser.id)? 'User': chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div> 
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
