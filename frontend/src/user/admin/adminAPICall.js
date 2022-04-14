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
