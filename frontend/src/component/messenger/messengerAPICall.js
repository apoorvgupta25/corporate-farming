import {API} from '../../backend';

export const getAllConversations = (userId) => {
    return fetch(`${API}/friends/${userId}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const postMessage = (message,contact,isCorporate) => {
    const body = {
        "message": message,
        "contact": contact,
        "isCorporate": isCorporate
    }
    return fetch(`${API}/messages/`, { method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body) 
     })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllMessages = (conversationId) => {
    return fetch(`${API}/messages/${conversationId}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
