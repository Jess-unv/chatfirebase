import { useChatStore } from "../../lib/chatStore";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
   useChatStore();
   const { currentUser } = useUserStore();



   const handleBlock = ()=>{

   }

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>arriba peru</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://th.bing.com/th/id/OIP.8n2SssdKwESEYixFG2ZuUwHaFj?rs=1&pid=ImgDetMain"
                  alt=""
                />
                <span>photo_2024.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://th.bing.com/th/id/OIP.8n2SssdKwESEYixFG2ZuUwHaFj?rs=1&pid=ImgDetMain"
                  alt=""
                />
                <span>photo_2024.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://th.bing.com/th/id/OIP.8n2SssdKwESEYixFG2ZuUwHaFj?rs=1&pid=ImgDetMain"
                  alt=""
                />
                <span>photo_2024.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://th.bing.com/th/id/OIP.8n2SssdKwESEYixFG2ZuUwHaFj?rs=1&pid=ImgDetMain"
                  alt=""
                />
                <span>photo_2024.png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Detail;
