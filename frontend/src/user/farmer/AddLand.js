import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';

import './add.css';
import {isAuth} from '../../auth/authAPICalls'
import {addLandToDB} from './farmerAPICalls'

const AddLand = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        photo: '',
        landProperties: {
            state: '',
            city: '',
            location:'',
            totalArea:''
        },
        soil:{
            nitrogen:'',
            phosphorous:'',
            potassium:'',
            ph:'',
        },
        bondTime: '',
        createdLand:'',
        rainfall:'',
        expectedProfit:{
            exactAmount: '',
            percentage:'',
        },
        error: '',
        formData: new FormData()
    });

    const {
        title,
        description,
        bondTime,
        landProperties,
        soil,
        createdLand,
        rainfall,
        expectedProfit,
        error,
        formData
    } = values;


    const {user, token} = isAuth();

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);

        setValues({...values, [name]: value});
    }

    const handleChangeLocation = name => event => {
        setValues({
            ...values,
            landProperties: {
                ...values.landProperties,
                [name]: event.target.value
            }
        });

        formData.set('landProperties.'+name, event.target.value);
    }
    const handleChangeSoil = name => event => {
        setValues({
            ...values,
            soil: {
                ...values.soil,
                [name]: event.target.value
            }
        });

        formData.set('soil.'+name, event.target.value);
    }
    const handleChangeExpectedProfit = name => event => {
        formData.set('expectedProfit.'+name, event.target.value);

        setValues({
            ...values,
            expectedProfit: {
                ...values.expectedProfit,
                [name]: event.target.value
            }
        });
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: createdLand ? "" : "none"}}>
                <h4>{createdLand} created Successfully</h4>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" style={{display: error ? "" : "none"}}>
                <h4>{error}</h4>
            </div>
        )
    }

    const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error:"" ,loading: true});

    addLandToDB(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                setValues({...values,
                    title: '',
                    description: '',
                    area:'',
                    photo: '',
                    landProperties: {
                        state: '',
                        city: '',
                        location:'',
                        totalArea:'',
                    },
                    soil:{
                        nitrogen:'',
                        phosphorous:'',
                        potassium:'',
                        ph:'',
                    },
                    bondTime: '',
                    rainfall: '',
                    expectedProfit:{
                        exactAmount: '',
                        percentage:'',
                    },
                    createdLand: data.title,
                })
            }
        })

    }

    var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal");

    return (
        <div className="add-main bg-cont-land">
            <div className="add-container">
                {successMessage()}
                {errorMessage()}

                <form method="POST" className="add-form" id="land-form">
                    <Link to={`/farmer/dashboard/${isAuth().user._id}`} className="btn btn-md btn-dark">Dashboard</Link>
                    <h2 className="add-heading" align="center">Land Lease</h2>

                    <div className="form-group-1">
                        <input className="add-input-select" type="text" name="title" onChange={handleChange("title")} value={title} placeholder="Title" required />
                        <input className="add-input-select" type="text" name="description" onChange={handleChange("description")} value={description} placeholder="Description" required />

                        <input className="add-input-select" type="number" name="exactAmount" onChange={handleChangeExpectedProfit("exactAmount")} value={expectedProfit.exactAmount} placeholder="Land Leasing Price" min="1" required />
                        <input className="add-input-select" type="number" name="percentage" onChange={handleChangeExpectedProfit("percentage")} value={expectedProfit.percentage} placeholder="Percentage of land Price" min="1" required />

                        <select className="add-input-select" name="state" onChange={handleChangeLocation("state")} >
                            <option>Select</option>
                            {states.map((state, index) => {
                                return ( <option value={state} key={state} >{state}</option> )
                                })
                            }
                        </select>
                        <input className="add-input-select" type="text" name="city" onChange={handleChangeLocation("city")} value={landProperties.city} placeholder="City" required />
                        <input className="add-input-select" type="number" name="totalArea" onChange={handleChangeLocation("totalArea")} value={landProperties.totalArea} placeholder="Land Area (in acres)" min="1" required />
                        <input className="add-input-select" type="text" name="location" onChange={handleChangeLocation("location")} value={landProperties.location} placeholder="Location" required />

                        <input className="add-input-select" type="number" name="bondTime" onChange={handleChange("bondTime")} value={bondTime} placeholder="Bond Time (in months)" min="1" required />
                        <input className="add-input-select" type="number" name="rainfall" onChange={handleChange("rainfall")} value={rainfall} placeholder="Rainfal in area (mm)" min="1" required />

                        <input className="add-input-select" type="number" name="nitrogen" onChange={handleChangeSoil("nitrogen")} value={soil.nitrogen} placeholder="Land Nitrogen Content" min="1" required />
                        <input className="add-input-select" type="number" name="phosphorous" onChange={handleChangeSoil("phosphorous")} value={soil.phosphorous} placeholder="Land Phosphorous Content" min="1" required />
                        <input className="add-input-select" type="number" name="potassium" onChange={handleChangeSoil("potassium")} value={soil.potassium} placeholder="Land Potassium Content" min="1" required />
                        <input className="add-input-select" type="number" name="ph" onChange={handleChangeSoil("ph")} value={soil.ph} placeholder="Land PH " min="1" required />

                        <div style={{color:'black'}}>Or Predict <a href="www.google.com">here</a></div>
                        <div style={{color:'black'}}>
                            <p >Land Image </p>
                            <input className="add-input-select" type="file" name="photo" accept="image/*" placeholder="Choose A Photo" onChange={handleChange("photo")} />
                        </div>
                    </div>
                    <div className="form-submit" style={{marginTop: '10%', marginLeft: '40%'}}>
                        <input className="add-input-select" type="submit" name="submit" onClick={onSubmit} value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddLand;
