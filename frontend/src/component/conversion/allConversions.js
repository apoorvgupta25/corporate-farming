import React, {useState, useEffect}  from "react";

import './conversion.css';

const AllConversations = (user) => {
    return (
        <>
       
        <div className="conversation">
            <div className="conversationName">{user.user}</div>
        </div>
        
        </>
    )
}

export default AllConversations;
