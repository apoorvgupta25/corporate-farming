import "./messenger.css";
import Topbar from "../topbar/topbar";
import React, {useState, useEffect}  from "react";
import { getAllConversations, getAllMessages, postMessage } from "./messengerAPICall";
import {isAuth} from '../../auth/authAPICalls';
import AllConversations from "../conversion/allConversions";
import Message from "../message/message";
import BouncingBall from '../animation/BouncingBall';

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: isAuth().user._id,
      text: newMessage,
      conversationId: currentChat,
    };

    const receiverId = "";

    try {
      postMessage(message)
        .then(data => {
            if (data.error) {

            } else {
                setMessages([...messages, data]);
                setNewMessage("");
            }
        })
    } catch (err) {
      console.log(err);
    }
  };

  const getConversationData = () => {
      getAllConversations(isAuth().user._id)
      .then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setConversations(data);
          }
          setLoading(false);
      })
  }

  const getConversationId = (id) => {
    if (id.toString() < isAuth().user._id.toString()) return id.toString() +"_"+isAuth().user._id.toString();
    if (id.toString() > isAuth().user._id.toString()) return isAuth().user._id.toString() +"_"+id.toString();
  }

    useEffect(() => {
        getConversationData()
    },[])


    const getMessages = () => {
      getAllMessages(currentChat)
      .then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
             setMessages(data);
          }
      })
    };
    useEffect(() => {
      getMessages();
    }, [currentChat]);


  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h3 className="font-weight-bold text-dark">Chats</h3>

          {isLoading && <BouncingBall/>}
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(getConversationId(c._id))}>
              <AllConversations user={c.name}/>
              </div>
            ))}
                <s />
          </div>

          </div>
          <div className="chatBox">
          <div className="chatBoxWrapper">
               {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div >
                      <Message message={m} own={m.sender === isAuth().user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}

         </div>
        </div>
    </div>
    </>
  );
}
