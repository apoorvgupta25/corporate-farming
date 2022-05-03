import React, {useState, useEffect}  from "react";

import './conversion.css';

const AllConversations = ({user, name, type}) => {
    var prod = ""
    if (type==0) prod = "land"
    else prod = "product"
    return (
        <>

        <div className="conversation">
            <div className="conversationName">
                <b>{user}</b>
                &nbsp;
                <i> {name}</i>
                &nbsp;
                [{prod}]
            </div>
        </div>

        </>
    )
}

export default AllConversations;
