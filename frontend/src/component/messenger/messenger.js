import "./messenger.css";
import Topbar from "../topbar/topbar";
import React, {useState, useRef, useEffect}  from "react";
import { getAllConversations, getAllMessages, postMessage } from "./messengerAPICall";
import {isAuth} from '../../auth/authAPICalls';
import AllConversations from "../conversion/allConversions";
import Message from "../message/message";
import BouncingBall from '../animation/BouncingBall';
import { Link } from "react-router-dom";

export default function Messenger() {
  if(!window.location.hash.includes("#reloaded")) {
    window.location.href += "#reloaded";
    window.location.reload();
  }
  const [currentChat, setCurrentChat] = useState(null);
  const [productName, setproductName] = useState('');
  const [friendName, setfriendName] = useState('');
  const [farmerId, setFarmerId] = useState('');
  const [productId, setproductId] = useState('');
  const [isprod, setisprod] = useState('');
  const [receiverNumber, setReceiverNumber] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setLoading] = useState(true);
  const scrollRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: isAuth().user._id,
      text: newMessage,
      conversationId: currentChat,
    };

    const receiverId = "";

    try {
      postMessage(message,receiverNumber,isAuth().user.role)
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

  const getlink = (productId, isprod) => {
    let link = "";
    if(isprod == 0){
      link  = "/land/"+productId.toString();
    }else{
      link = "/product/"+productId.toString();
    }

    return link;
  }
  const getConversationId = (productId,id) => {
    if (id.toString() < isAuth().user._id.toString()) return productId.toString()+id.toString() +"_"+isAuth().user._id.toString();
    if (id.toString() > isAuth().user._id.toString()) return productId.toString()+isAuth().user._id.toString() +"_"+id.toString();
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

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h3 className="font-weight-bold text-dark">Chats</h3>

          {isLoading && <BouncingBall/>}
          {conversations.map((c) => (
            <div onClick={function() {setCurrentChat(getConversationId(c.productId,c.friendId));
                                      setFarmerId(c.friendId);
                                      setReceiverNumber(c.contact);
                                      setproductName(c.productName);
                                      setfriendName(c.name);
                                      setproductId(c.productId);
                                      setisprod(c.isprod)}}
                                      >
              <AllConversations user={c.name} name={c.productName} type={c.isprod}/>
              </div>
            ))}
                <s />
          </div>

          </div>

          <div className="chatBox">

          <div className="chatBoxWrapper">

               {currentChat ? (
              <>
                <div className="bg-grey p-2" style={{borderRadius: "5px"}}><b>{friendName}</b> <i> {productName}</i> [{isprod==1 ?"product" :"land"}]
                {isAuth().user.role === 1 && (
                  <Link to={`/contract/${productId}/${farmerId}/${isprod}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <button className="btn btn-success btn-sm float-right ml-1">
                      Create Contract
                    </button>
                  </Link>
                )}

                <Link to={getlink(productId,isprod)} style={{ textDecoration: 'none', color: 'white' }}>
                  <button className="btn btn-success btn-sm float-right ml-1">
                      About
                  </button>
                </Link>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
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
