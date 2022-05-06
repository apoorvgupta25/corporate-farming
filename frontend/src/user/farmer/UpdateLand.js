import React, {useState, useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Person, Dashboard } from "@material-ui/icons";

import './add.css';
import {isAuth} from '../../auth/authAPICalls'
import {updateLandInDB} from './farmerAPICalls';
import {getLand} from '../../component/land/landAPICall'
import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';

const UpdateLand = () => {

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
        updatedLand:'',
        rainfall:'',
        expectedProfit:{
            exactAmount: '',
            percentage:'',
        },
        error: '',
        saving: false,
        createdId: '',
        formData:new FormData()
    });

    const {
        title, description, bondTime, landProperties, soil, updatedLand,
        rainfall, expectedProfit, error, saving, formData
    } = values;

    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(title.length);

    const {user, token} = isAuth();
    const { landId } = useParams();

    const preload = (landId) => {
        getLand(landId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values,
                    title: data.title,
                    description: data.description,
                    bondTime: data.bondTime,
                    landProperties: {
                        state: data.landProperties.state,
                        city: data.landProperties.city,
                        location: data.landProperties.location,
                        totalArea: data.landProperties.totalArea,
                    },
                    soil:{
                        nitrogen: data.soil.nitrogen,
                        phosphorous: data.soil.phosphorous,
                        potassium: data.soil.potassium,
                        ph: data.soil.ph,
                    },
                    rainfall: data.rainfall,
                    expectedProfit:{
                        exactAmount: data.expectedProfit.exactAmount,
                        percentage: data.expectedProfit.percentage,
                    },
                    saving:false,
                });
            }
            setLoading(false);
        })
        .catch()
    };

    useEffect(() => {
        preload(landId);
    }, [])

    if (loading){
        return <ThreeDotsWave/>;
    }


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        setValues({...values, [name]: value});
        formData.set(name, value);
        if(name=='title')
            setCount(event.target.value.length);
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
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: updatedLand ? '' : 'none' }}
            >
                <h5><Link to={`/land/${landId}`} className="text-primary">{updatedLand}</Link> Updated Successfully</h5>
            </Alert>
        )
    }

    const errorMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="danger"
                style={{ display: error ? '' : 'none' }}
            >
                <h5>{error}</h5>
            </Alert>
        )
    }

    const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error:"", saving: true});

    updateLandInDB(landId, user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, saving: false})
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
                    saving: false,
                    updatedLand: data.title
                })
            }
        })

    }

    var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
                            "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa",
                            "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
                            "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
                            "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura",
                            "Uttaranchal", "Uttar Pradesh", "West Bengal");
    return (
        <>
        <Topbar/>
        <CircleModal saving={saving}/>

        <div className="add-main bg-cont-land">
            <div className="add-container mx-auto">
                <Link className="btn btn-primary ml-3 mt-3" to={`/farmer/dashboard/${user._id}`}> <Person/> Dashboard</Link>
                <Link className="btn btn-primary ml-3 mt-3" to={`/farmer/manage/land`}> <Dashboard/> Manage Land</Link>

                <form method="POST" className="add-form">
                    {errorMessage()}
                    <h2 className="add-heading" align="center">Update Land Lease</h2>

                    <label className="add-label">Title <p className="text-dark pull-right mb-0">{count}/16</p></label>
                    <input className="add-input" maxlength='16' type="text" name="title" onChange={handleChange("title")} value={title} placeholder="Title" required />
                    <label className="add-label">Description</label>
                    <input className="add-input" type="text" name="description" onChange={handleChange("description")} value={description} placeholder="Description" required />
                    <label className="add-label">Leasing Price</label>
                    <input className="add-input" type="number" name="exactAmount" onChange={handleChangeExpectedProfit("exactAmount")} value={expectedProfit.exactAmount} placeholder="Leasing Price (₹)" min="1" required />
                    <label className="add-label">Percentage of land Price</label>
                    <input className="add-input" type="number" name="percentage" onChange={handleChangeExpectedProfit("percentage")} value={expectedProfit.percentage} placeholder="Percentage of land Price" min="1" required />

                    <label className="add-label">State</label>
                    <select className="add-input" name="state" onChange={handleChangeLocation("state")} >
                        <option>-- Select --</option>
                        {states.map((state, index) => {
                            return ( <option value={state} key={state} >{state}</option> )
                        })}
                    </select>
                    <label className="add-label">City</label>
                    <input className="add-input" type="text" name="city" onChange={handleChangeLocation("city")} value={landProperties.city} placeholder="City" required />
                    <label className="add-label">Area</label>
                    <input className="add-input" type="number" name="totalArea" onChange={handleChangeLocation("totalArea")} value={landProperties.totalArea} placeholder="Land Area (In acres)" min="1" required />
                    <label className="add-label">Address</label>
                    <input className="add-input" type="text" name="location" onChange={handleChangeLocation("location")} value={landProperties.location} placeholder="Location" required />

                    <label className="add-label">Bond Time (in months)</label>
                    <input className="add-input" type="number" name="bondTime" onChange={handleChange("bondTime")} value={bondTime} placeholder="Bond Time (in months)" min="1" required />

                    <label className="add-label">Rainfal in area (mm)</label>
                    <input className="add-input" type="number" name="rainfall" onChange={handleChange("rainfall")} value={rainfall} placeholder="Rainfal in area (mm)" min="1" required />
                    <label className="add-label">Land Nitrogen Content</label>
                    <input className="add-input" type="number" name="nitrogen" onChange={handleChangeSoil("nitrogen")} value={soil.nitrogen} placeholder="Land Nitrogen Content" min="1" required />
                    <label className="add-label">Land Phosphorous Content</label>
                    <input className="add-input" type="number" name="phosphorous" onChange={handleChangeSoil("phosphorous")} value={soil.phosphorous} placeholder="Land Phosphorous Content" min="1" required />
                    <label className="add-label">Land PH</label>
                    <input className="add-input" type="number" name="ph" onChange={handleChangeSoil("ph")} value={soil.ph} placeholder="Land PH " min="1" required />
                    <label className="add-label">Land Potassium Content</label>
                    <input className="add-input" type="number" name="potassium" onChange={handleChangeSoil("potassium")} value={soil.potassium} placeholder="Land Potassium Content" min="1" required />

                    <label className="add-label" >Land Image </label>
                    <input className="add-input" type="file" name="photo" accept="image/*" placeholder="Choose A Photo" onChange={handleChange("photo")} />

                    <div className="form-button">
                        <input className="btn btn-primary w-100" type="submit" name="submit" onClick={onSubmit} value="Update" />
                    </div>
                    {successMessage()}
                </form>
            </div>
        </div>
        </>
    )
}

export default UpdateLand;
