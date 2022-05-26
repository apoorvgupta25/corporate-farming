import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import {signup} from './authAPICalls';

import './signin_signup.css';
import Topbar from '../component/topbar/topbar';
import CircleModal from '../component/animation/CircleModal';

const SignupCorporate = () => {

    const [values, setValues] = useState({
        name: "",
        cin: "",
        email: "",
        password: "",
        error: "",
        success: false,
        saving: false,
        formData: new FormData()
    });

    const [inValidCIN, setInValidCIN] = useState(false)
    const {name, cin, email, password, error, success, saving, formData} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});

        formData.set(name, event.target.value);

        if(name==="cin"){
            if(event.target.value.length === 21) setInValidCIN(false);
            else setInValidCIN(true);
        }
    }

    const successMessage = () => {
        return (
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <div className="alert alert-success" style={{ display: success ? '' : 'none' }} >
                New account was created successfully. Please <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };

    const errorMessage = () => {
        return (
          <div className="row justify-content-center">
            <div className="col-md-3 text-center">
              <div className="alert alert-danger" style={{ display: error ? '' : 'none' }} >
                {error}
              </div>

              <div className="alert alert-danger" style={{ display: inValidCIN ? '' : 'none' }} >
                Invalid CIN
              </div>
            </div>
          </div>
        );
      };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, saving: true})
        formData.set("role", 1);

        if(!inValidCIN){
            signup(formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success: false, saving: false});
                }
                else{
                    setValues({...values,
                        name: "",
                        cin: "",
                        email: "",
                        password: "",
                        error: "",
                        saving: false,
                        success: true
                    });
                }
            })
        }
    }

    return (
        <div className="container-sign">
            <Topbar/>
            <CircleModal saving={saving}/>

            {successMessage()}
            {errorMessage()}
            <div className="form-box corporate">
                <div className="heading">Corporate Signup</div>

                <form className="input-group">
                    <input className="input-field" placeholder="Name" onChange={handleChange("name")} value={name} required/>
                    <input className="input-field" placeholder="CIN" onChange={handleChange("cin")} value={cin} required/>
                    <input className="input-field" placeholder="Email Id" type="email" onChange={handleChange("email")} value={email} required/>
                    <input className="input-field" placeholder="Password" type="password" onChange={handleChange("password")} value={password} required/>

                    <button type="submit" className="submit-btn" onClick={onSubmit}>Sign Up</button>

                    <div className="mt-2">
                        Already Registered? <Link to="/signin"> Login Here</Link>
                    </div>
                    <div className="mt-2 mb-2">
                         <Link to="/signup/farmer">Register as Farmer</Link>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SignupCorporate;
