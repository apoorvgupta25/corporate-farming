import {API} from '../../backend';

export const getAllLands = () => {
    return fetch(`${API}/lands?sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
