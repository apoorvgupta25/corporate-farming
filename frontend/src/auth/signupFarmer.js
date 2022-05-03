import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import {signup} from './authAPICalls';

import './signin_signup.css';
import Topbar from '../component/topbar/topbar';

const SignupFarmer = () => {

    const [values, setValues] = useState({
        name: "",
        aadhaar: "",
        contact: "",
        email: "",
        password: "",
        role: 0,
        error: "",
        success: false
    });

    const [inValidAadhaar, setInValidAadhaar] = useState(false)
    const [inValidContact, setInValidContact] = useState(false)

    const {name, aadhaar, contact, email, password, role, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});

        if(name=="aadhaar"){
            if(event.target.value.length == 12) setInValidAadhaar(false);
            else setInValidAadhaar(true);
            console.log(name, event.target.value, inValidAadhaar);
        }

        if(name=="contact"){
            if(event.target.value.length == 10) setInValidContact(false);
            else setInValidContact(true);
            console.log(name, event.target.value, inValidContact);
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

              <div className="alert alert-danger" style={{ display: inValidAadhaar ? '' : 'none' }} >
                Invalid Aadhaar Number
              </div>

              <div className="alert alert-danger" style={{ display: inValidContact ? '' : 'none' }} >
                Invalid Contact Number
              </div>
            </div>
          </div>
        );
      };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        if(!inValidAadhaar && !inValidContact){
            signup({name, aadhaar, contact, email, role, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success: false});
                }
                else{
                    setValues({...values,
                        name: "",
                        aadhaar: "",
                        contact: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
        }
    }

    return (
        <div className="container-sign">
            <Topbar/>

            {successMessage()}
            {errorMessage()}
            <div className="form-box-signup farmer mt-5">
                <div className="button-box">
                    <div className="toggle-btn font-weight-bold">Farmer Signup</div>
                </div>

                <form className="input-group">
                    <input className="input-field" placeholder="Name" onChange={handleChange("name")} value={name} required/>
                    <input className="input-field" placeholder="Aadhaar Number" type="number" onChange={handleChange("aadhaar")} value={aadhaar} required/>
                    <input className="input-field" placeholder="Contact" type="number" onChange={handleChange("contact")} value={contact} required/>

                    <input className="input-field" placeholder="Email Id" type="email" onChange={handleChange("email")} value={email} required/>
                    <input className="input-field" placeholder="Enter Password" type="password" onChange={handleChange("password")} value={password} required/>

                    <button type="submit" className="submit-btn" onClick={onSubmit}>Sign Up</button>

                    <div className="mt-4">
                        Already Registered? <Link to="/signin">Login Here</Link>
                    </div>
                    <div className="mt-4">
                         <Link to="/signup/corporate">Register as Corporate</Link>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SignupFarmer;
