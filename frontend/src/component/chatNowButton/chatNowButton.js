import React from 'react';
import {useNavigate} from 'react-router-dom'

import {isAuth} from '../../auth/authAPICalls';
import { FollowUser } from './chatNowButtonAPICall';

import "./chatButton.css";

const ChatNowButton = (param) =>  {

    const navigate = useNavigate();
    const handleClick = () => {
        FollowUser(isAuth().user._id, param.userId, param.productId, param.productName, param.isprod)
        .then(navigate(`/quickMessenger/${param.productId}/${param.userId}/${param.isProd}/`));
    }

    return (
        <div>
            <button className='ChatButton' onClick={handleClick}>Chat Now</button>
        </div>
    )
}
export default ChatNowButton;
