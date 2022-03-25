import {API} from '../../backend';

export const FollowUser = (currentUserId, UserId) => { 
    
       return fetch(`${API}/follow/${currentUserId}/${UserId.userId}`, { 
         method: "PUT",
       }).then(response => {
         return response.json();
       })
       .catch(err => console.log(err));
   };