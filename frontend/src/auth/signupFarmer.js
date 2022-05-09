import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

import {signup} from './authAPICalls';

import './signin_signup.css';
import Topbar from '../component/topbar/topbar';
import CircleModal from '../component/animation/CircleModal';

const SignupFarmer = () => {

    const [values, setValues] = useState({
        name: "",
        aadhaar: "",
        contact: "",
        email: "",
        password: "",
        age: "",
        role: 0,
        gender: "",
        error: "",
        success: false,
        saving: false,
        formData: new FormData()
    });

    const [validAadhaar, setValidAadhaar] = useState(false)
    const [validContact, setValidContact] = useState(false)
    const [gender, genderInputProps] = useRadioButtons("gender");
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [submitted, setSubmitted] = useState(false)

    const {name, aadhaar, contact, age, state, email, password, role, error, success, saving, formData} = values;

    var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
                            "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa",
                            "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
                            "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
                            "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura",
                            "Uttaranchal", "Uttar Pradesh", "West Bengal");

    const handleChange = name => event => {
        let value=""
        if(name !== "photo") value = event.target.value

        formData.set(name, value);

        setValues({...values, error: false, [name]: value});
        if(name=="aadhaar"){
            if(event.target.value.length == 12) setValidAadhaar(true);
            else setValidAadhaar(false);
        }

        if(name=="contact"){
            if(event.target.value.length == 10) setValidContact(true);
            else setValidContact(false);
        }
    }

    function useRadioButtons(name) {
        const [value, setState] = useState(null);

        const handleChange = e => {
            formData.set(name, e.target.value);
            setState(e.target.value);
        };

        const inputProps = {
            name,
            type: "radio",
            onChange: handleChange
        };

        return [value, inputProps];
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        formData.set("photo", e.target.files[0])
        setSelectedFile(e.target.files[0])
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

              <div className="alert alert-danger" style={{ display: (!validAadhaar) ? '' : 'none' }} >
                Invalid Aadhaar Number
              </div>

              <div className="alert alert-danger" style={{ display: (!validContact) ? '' : 'none' }} >
                Invalid Contact Number
              </div>

              <div className="alert alert-danger" style={{ display: preview===undefined ? '' : 'none' }} >
                Add Image
              </div>
            </div>
          </div>
        );
      };

    const onSubmit = event => {
        setSubmitted(true);
        formData.set("role", 0);
        event.preventDefault()
        setValues({...values, error: false, saving: true})
        if(validAadhaar && validContact && preview!==undefined){
            signup(formData)
            .then(data => {
                window.scrollTo(0,0)
                if(data.error){
                    setValues({...values, error: data.error, success: false, saving: false});
                }
                else{
                    setValues({...values,
                        name: "",
                        aadhaar: "",
                        contact: "",
                        age: "",
                        state: "",
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
            {submitted && errorMessage()}
            <div className="form-box farmer">
            <div className="heading">Farmer Signup</div>

                <form className="input-group">
                    <input type="file" name="photo" accept="image/*" placeholder="Choose A Profile Photo" onChange={handleChange("photo"), onSelectFile} required='required'/>
                    {selectedFile &&  <img src={preview} className="profile-img-signup"/> }

                    <input className="input-field" placeholder="Name" onChange={handleChange("name")} value={name} required/>
                    <input className="input-field" placeholder="Age" type="number" onChange={handleChange("age")} value={age} required/>
                    <input className="input-field" placeholder="Aadhaar Number" type="number" onChange={handleChange("aadhaar")} value={aadhaar} required/>
                    <input className="input-field" placeholder="Contact" type="number" onChange={handleChange("contact")} value={contact} required/>
                    <select className="select-field" name="state" onChange={handleChange("state")} >
                        <option>State</option>
                        {states.map((state, index) => {
                            return ( <option value={state} key={state} >{state}</option> )
                            })}
                    </select>
                    <input className="input-field" placeholder="Email Id" type="email" onChange={handleChange("email")} value={email} required/>
                    <input className="input-field" placeholder="Password" type="password" onChange={handleChange("password")} value={password} required/>

                    <div className="mt-2">
                        <input className="form-check-input pull-left" type="radio" name="Type" value="Male" checked={gender === "Male"} {...genderInputProps}  />
                        <label className="form-check-label">Male</label>

                        <input className="form-check-input ml-4" type="radio" name="Type" value="Female" checked={gender === "Female"} {...genderInputProps}  />
                        <label className="form-check-label ml-5">Female</label>
                    </div>

                    <button type="submit" className="submit-btn" onClick={onSubmit}>Sign Up</button>

                    <div className="mt-2">
                        Already Registered? <Link to="/signin">Login Here</Link>
                    </div>
                    <div className="mt-2 mb-2">
                         <Link to="/signup/corporate">Register as Corporate</Link>
                    </div>

                </form>

            </div>
        </div>
    );
};


export default SignupFarmer;
