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
export const updateLandInDB = (landId, userId, token, land) => {
    return fetch(`${API}/land/${landId}/${userId}`,{
        method: "PUT",
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


// update product
export const updateProductInDB = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
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

// delete land
export const deleteLand = (landId, userId, token) => {
    return fetch(`${API}/land/${landId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            }
        })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}

// delete product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            }
        })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}
