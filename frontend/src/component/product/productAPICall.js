import {API} from '../../backend';

export const getAllProducts = () => {
    return fetch(`${API}/products?sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
