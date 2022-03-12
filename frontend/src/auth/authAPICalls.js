import {API} from '../backend';

//signup
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//signin
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt_corp', JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt_corp');
        // next();

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(respose => console.log('signout success'))
        .catch(err => console.log(err));
    }
};

export const isAuth = () => {
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt_corp')){
        return JSON.parse(localStorage.getItem('jwt_corp'));
    }
    return false;
}
