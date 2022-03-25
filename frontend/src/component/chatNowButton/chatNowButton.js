import React from 'react';
import { FollowUser } from './chatNowButtonAPICall';
import "./chatButton.css";
import {isAuth} from '../../auth/authAPICalls';
import {useNavigate} from 'react-router-dom'
const ChatNowButton = (userId) =>  {  
const navigate = useNavigate();
  const handleClick = () => {
    FollowUser(isAuth().user._id,userId)
    .then(navigate('/messenger'))
   }
    return (
       <div>
        <button className='ChatButton' onClick={handleClick}>ChatButton</button>
       </div>
    ) 
}
export default ChatNowButton;