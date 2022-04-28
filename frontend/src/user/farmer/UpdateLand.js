import React, {useState, useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';

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
        title,
        description,
        bondTime,
        landProperties,
        soil,
        updatedLand,
        rainfall,
        expectedProfit,
        error,
        saving,
        formData
    } = values;

    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0);

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

    console.log(updatedLand);

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

    var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal");

    return (
        <>
        <Topbar/>
        <CircleModal saving={saving}/>

        <div className="add-main bg-cont-land">
            <div className="add-container mx-auto">

                <form method="POST" className="add-form">
                    {errorMessage()}
                    <h2 className="add-heading" align="center">Land Lease</h2>

                    <div className="form-group-1">
                        <p className="text-dark pull-right">{count}/16</p>
                        <input className="add-input-select" maxlength="16" type="text" name="title" onChange={handleChange("title")} value={title} placeholder="Title" required />
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

                        <div style={{color:'black'}}>
                            <p >Land Image </p>
                            <input className="add-input-select" type="file" name="photo" accept="image/*" placeholder="Choose A Photo" onChange={handleChange("photo")} />
                        </div>
                    </div>
                    <div className="form-submit" style={{marginTop: '10%', padding: '10px 30px'}}>
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
