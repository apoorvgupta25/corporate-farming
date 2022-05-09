import {API} from '../../backend';

export const getUnverifiedFarmers = (userId, token) => {
    return fetch(`${API}/farmer/unverified/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getVerifiedFarmers = (userId, token) => {
    return fetch(`${API}/farmer/verified/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getInvalidFarmers = (userId, token) => {
    return fetch(`${API}/farmer/invalid/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getUnverifiedCorporates = (userId, token) => {
    return fetch(`${API}/corporate/unverified/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getVerifiedCorporates = (userId, token) => {
    return fetch(`${API}/corporate/verified/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getInvalidCorporates = (userId, token) => {
    return fetch(`${API}/corporate/invalid/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getVerificationEnums = (userId, token) => {
    return fetch(`${API}/verification/enums/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateVerification = (farmerId, userId, token, verificationStatus) => {
    return fetch(`${API}/verification/update/${farmerId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(verificationStatus)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getUnverifiedLands = (userId, token) => {
    return fetch(`${API}/lands/admin/${userId}?filterBy=Unverified`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getVerifiedLands = (userId, token) => {
    return fetch(`${API}/lands/admin/${userId}?filterBy=Verified`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getInvalidLands = (userId, token) => {
    return fetch(`${API}/lands/admin/${userId}?filterBy=Invalid`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getLandVerificationEnums = (userId, token) => {
    return fetch(`${API}/verification/land/enums/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateLandVerification = (landId, userId, token, verificationStatus) => {
    return fetch(`${API}/verification/land/update/${landId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(verificationStatus)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
