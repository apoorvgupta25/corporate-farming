import {API} from '../../backend';

// add contract
export const addContractToDB = (userId, token, contract) => {

    return fetch(`${API}/contract/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: contract
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

//Get all contracts
export const getAllContracts = () => {
    return fetch(`${API}/contracts?sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//get contract by id
export const getContract = (ContractId) => {
    return fetch(`${API}/contract/${ContractId}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


export const updateContractInDB = (contractId, userId, token, cont) => {
    return fetch(`${API}/contract/${contractId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cont)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}
