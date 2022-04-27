import React from 'react';
import { FollowUser } from './chatNowButtonAPICall';
import "./chatButton.css";
import {isAuth} from '../../auth/authAPICalls';
import {useNavigate} from 'react-router-dom'
const ChatNowButton = (param) =>  {
const navigate = useNavigate();
  const handleClick = () => {
    FollowUser(isAuth().user._id,param.userId,param.productId,param.productName,param.isprod)
    .then(navigate('/messenger'))
   }
    return (
       <div>
        <button className='ChatButton' onClick={handleClick}>Chat Now</button>
       </div>
    )
}
export default ChatNowButton;
