import "../messenger/messenger.css";
import Topbar from "../topbar/topbar";
import React, {useState, useRef, useEffect}  from "react";
import { getAllMessages, postMessage } from "../messenger/messengerAPICall";
import {isAuth} from '../../auth/authAPICalls';
import Message from "../message/message";
import BouncingBall from '../animation/BouncingBall';
import { Link } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { getProduct } from "../product/productAPICall";
import { getLand } from "../land/landAPICall";
import { format } from "timeago.js";

export default function QuickMessenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [receiverNumber,setReceiverNumber] =useState("");
  const scrollRef = useRef();
  const { productId ,isProd, friendId} = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: isAuth().user._id,
      text: newMessage,
      conversationId: currentChat,
    };

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

  const getlink = (productId, isProd) => {
    let link = "";
    if(isProd == 0){
      link  = "/land/"+productId;
    }else{
      link = "/product/"+productId;
    }
     
    return link;
  }
  const getConversationId = (productId,id) => {
    if (id.toString() < isAuth().user._id.toString()) return productId.toString()+id.toString() +"_"+isAuth().user._id.toString();
    if (id.toString() > isAuth().user._id.toString()) return productId.toString()+isAuth().user._id.toString() +"_"+id.toString();
  }

  const loadProduct = (productId,isProd) => {
    if(isProd === "1"){
        getProduct(productId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProduct(data);
                setReceiverNumber(data.farmer.contact);
            }
            setLoading(false);
        })
    }else{
        getLand(productId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProduct(data);
                setReceiverNumber(data.farmer.contact);
            }
            setLoading(false);
         })
    }
    
    };

    useEffect(() => {
        loadProduct(productId,isProd);
        setCurrentChat(getConversationId(productId,friendId));
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
            <h3 className="font-weight-bold text-dark">{isProd === "1" ? "Product" : "Land"} Details</h3>
          <br></br>
          {isLoading ? (<BouncingBall/>):(
              <div>
                
                        <h4>{isProd === "1" ? "Product" : "Land"}: {product.title}</h4>
                        <h4>Description: {product.description}</h4>
                        <h4>Created At: {format(product.createdAt)}</h4>
                        <br></br>
                        <h3 className="font-weight-bold text-dark">Farmer Details</h3>
                        <br></br>
                        <h4>{product.farmer._id}</h4>
                        <h4>Name: {product.farmer.name}</h4>
                        <h4>contact: {receiverNumber}</h4>
                        <h4>email: {product.farmer.email}</h4>
                       <Link to={`/contract/${productId}/${product.farmer._id}/${isProd}`} style={{ textDecoration: 'none', color: 'white' }}>
                         <button className="btn btn-success btn-sm float-right ml-1">
                             Create Contract
                         </button>
                       </Link>


              </div>
          )}         


            <Link target="_blank" to={getlink(productId,isProd)} style={{ textDecoration: 'none', color: 'white' }}>
                  <button className="btn btn-success btn-sm float-right ml-1">
                  More Infomation About This {isProd === "1" ? "Product" : "Land"} 
                  </button>
            </Link>
            <Link target="_blank" to="/messenger/" style={{ textDecoration: 'none', color: 'white' }}>
                  <button className="btn btn-success btn-sm float-right ml-1">
                   Open all chats 
                  </button>
            </Link>

          </div>
            <s />
          </div>
          
          <div className="chatBox">
          
          <div className="chatBoxWrapper">
          
               {currentChat ? (
              <>
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
