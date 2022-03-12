import {API} from '../../backend';

export const getRecent3Lands = () => {
    return fetch(`${API}/lands?limit=3&sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getRecent3Products = () => {
    return fetch(`${API}/products?limit=3&sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
