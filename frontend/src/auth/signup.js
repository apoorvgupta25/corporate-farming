import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import {signup} from './authAPICalls';

import './style.css';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const [role, roleInputProps] = useRadioButtons("role");

    const {name, phone, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-success" style={{ display: success ? '' : 'none' }} >
                New account was created successfully. Please <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
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
        setValues({...values, error: false})
        signup({name, email, role, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            }
            else{
                setValues({...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        })

    }

    return (
        <div className="container-sign">

            <Link to="/" style={{ textDecoration:'none'}}>
                <h1 className="text-center mt-5 text-light">Corp-Farm</h1>
            </Link>

            {successMessage()}
            {errorMessage()}
            <div className="form-box-signup">
                <div className="button-box">
                    <div className="toggle-btn">Register</div>
                </div>

                <form className="input-group">
                    <input className="input-field" placeholder="Name" onChange={handleChange("name")} value={name} required/>
                    <input className="input-field" placeholder="Email Id" type="email" onChange={handleChange("email")} value={email} required/>
                    <input className="input-field" placeholder="Enter Password" type="password" onChange={handleChange("password")} value={password} required/>


                    <div className="form-check mt-4">
                        <input className="form-check-input" type="radio" name="Type" value="0" checked={role === "0"} {...roleInputProps}/>
                        <label className="form-check-label"> Farmer </label>

                        <input className="form-check-input ml-4" type="radio" name="Type" value="1" checked={role === "1"} {...roleInputProps}/>
                        <label className="form-check-label ml-5" > Corporate</label>
                    </div>

                    <button type="submit" className="submit-btn" onClick={onSubmit}>Sign Up</button>

                    <div className="mt-5">
                        <Link to="/signin"> Already Registered Here?</Link>
                    </div>

                </form>

            </div>
        </div>
    );
};

function useRadioButtons(name) {
    const [value, setState] = useState(null);

    const handleChange = e => {
        setState(e.target.value);
    };

    const inputProps = {
        name,
        type: "radio",
        onChange: handleChange
    };

    return [value, inputProps];
}

export default Signup;
