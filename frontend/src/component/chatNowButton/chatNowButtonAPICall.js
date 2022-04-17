import {API} from '../../backend';

export const FollowUser = (currentUserId, UserId, productId, productName, isprod) => { 
        const body = {
          "productId": productId,
          "productName": productName,
          "isprod": isprod,
      }

       return fetch(`${API}/follow/${currentUserId}/${UserId}/`, { 
         method: "PUT",
         headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body) 
       }).then(response => {
         return response.json();
       })
       .catch(err => console.log(err));
   };