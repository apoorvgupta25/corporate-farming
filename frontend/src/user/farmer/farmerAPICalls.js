import {API} from '../../backend';

// add Land
export const addLandToDB = (userId, token, land) => {

    return fetch(`${API}/land/add/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: land
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

// add product
export const addProductToDB = (userId, token, product) => {

    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

// update Land

// update product

// delete land

// delete product
