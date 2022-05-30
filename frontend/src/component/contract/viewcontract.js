import React, {useState, useRef, useEffect}  from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import { getContract } from "./contractAPICall";
import { getAllMessages, postMessage } from "../messenger/messengerAPICall";

import Topbar from "../topbar/topbar";
import Message from "../message/message";
import BouncingBall from '../animation/BouncingBall';

import "../messenger/messenger.css";

export default function ViewContract() {
  const [currentChat, setCurrentChat] = useState(null);
  const receiverNumber = null;


  const [messages, setMessages] = useState([]);
  const [contract, setContract] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const { contractId } = useParams();
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
    if(isProd === 0){ link  = "/land/"+productId;}
    else{ link = "/product/"+productId;}

    return link;
  }

  const loadContract = contractId => {
    getContract(contractId)
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setContract(data);
        }
        setLoading(false);
    })
    };

    useEffect(() => {
        loadContract(contractId);
        setCurrentChat(contractId);
        // eslint-disable-next-line
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
      // eslint-disable-next-line
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
            <h3 className="font-weight-bold text-dark">Contract Details</h3>
          <br></br>
          {isLoading && <BouncingBall/>}

          <h4>Duration: {contract.duration}</h4>
          <h4>Status: {contract.status}</h4>
          {contract.status !== 'proposed' && (
                <h4>Reason: {contract.reason}</h4>
            )}

          <h4>Document: <a href={`${API}/contract/pdf/${contract._id}`} target="_blank" rel="noreferrer" className="text-primary">Contract</a> </h4>
          <h4>Created At: {format(contract.createdAt)}</h4>
          <h4>Updated At: {format(contract.updatedAt)}</h4>

            {isAuth().user.role === 0 && contract.status === 'proposed' && (
                <Link to={`/contract/statusChange/${contractId}/rejected`} style={{ textDecoration: 'none', color: 'white' }}>
                    <button className="btn btn-success btn-sm float-right ml-1">
                        Reject Contract
                    </button>
                </Link>
            )}
            {isAuth().user.role === 0 && contract.status === 'proposed' && (
                <Link to={`/contract/statusChange/${contractId}/accepted`} style={{ textDecoration: 'none', color: 'white' }}>
                  <button className="btn btn-success btn-sm float-right ml-1">
                    Accept Contract
                  </button>
                </Link>

            )}
            <Link target="_blank" to={getlink(contract.product, contract.isProd)} style={{ textDecoration: 'none', color: 'white' }}>
                  <button className="btn btn-success btn-sm float-right ml-1">
                      Product Details
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
