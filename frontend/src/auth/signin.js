import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom';

import {signin, authenticate, isAuth} from './authAPICalls';

import Topbar from '../component/topbar/topbar';

import './signin_signup.css';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuth();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const performRedirect = () => {
        if(didRedirect || isAuth()){
            if(user && user.role === 0){
                return <Navigate to={`/farmer/dashboard/${user._id}`}/>
            }
            else if(user && user.role === 1){
                return <Navigate to={`/corporate/dashboard/${user._id}`}/>
            }
            else if(user && user.role === 2){
                // didRedirect = false;
                // signout();
                // fetch(`${API}/signout`, {
                //     method: "GET"
                // })
                // .then(respose => console.log('signout success'))
                // .catch(err => console.log(err));
                return <Navigate to={`/admin/dashboard/${user._id}`}/>
            }
        }
    }


    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                  <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-info" style={{ display: loading ? '' : 'none' }} >
                        <h2>Loading...</h2>
                    </div>
                  </div>
                </div>
            )
        );
      };

    const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger" style={{ display: error ? '' : 'none' }} >
                {error}
              </div>
            </div>
          </div>
        );
      };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values,
                        email: "",
                        password: "",
                        error: "",
                        didRedirect: true
                    });
                })
            }
        })

    }

    return (
        <div className="container-sign">
            <Topbar/>

            {loadingMessage()}
            {errorMessage()}
            <div className="form-box login">
                <div className="heading">Sign In</div>

                <form className="input-group">
                    <input className="input-field" placeholder="Email Id" type="email" onChange={handleChange("email")} value={email} required/>
                    <input className="input-field" placeholder="Enter Password" type="password" onChange={handleChange("password")} value={password} required/>
                    <button type="submit" className="submit-btn" onClick={onSubmit}>Signin</button>

                    <div className="my-3">
                        <Link to="/signup/farmer">Register Here</Link>
                    </div>

                </form>

            </div>


            {performRedirect()}
        </div>
    )

}

export default Signin;
