import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Person, Dashboard } from "@material-ui/icons";

import {isAuth} from '../../auth/authAPICalls'
import {updateLandInDB} from './farmerAPICalls';
import {getLand} from '../../component/land/landAPICall'

import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';

import './add.css';

const UpdateLand = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        photo: '',
        landProperties: {
            state: '',
            district: '',
            location:'',
            taluka: '',
            village: '',
            survey: '',
            totalArea:''
        },
        remarks: '',
        bondTime: '',
        createdLand:'',
        expectedProfit:{
            exactAmount: '',
            percentage:'',
        },
        error: '',
        saving: false,
        createdId: '',
        formData: new FormData()
    });


    const {
        title, description, bondTime, landProperties, remarks, updatedLand,
        expectedProfit, error, saving, formData
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
                        district: data.landProperties.district,
                        taluka: data.landProperties.taluka,
                        village: data.landProperties.village,
                        survey: data.landProperties.survey,
                        location: data.landProperties.location,
                        totalArea: data.landProperties.totalArea,
                    },
                    remarks: data.remarks,
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
        // eslint-disable-next-line
    }, [])

    if (loading){
        return <ThreeDotsWave/>;
    }


    const handleChange = name => event => {
        let value = event.target.value;
        if(name === "photo")
            value = event.target.files[0]
        // if(name === "landPDF")
        //     value = event.target.files[0]

        setValues({...values, [name]: value});
        formData.set(name, value);
        if(name==='title')
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
                        district: '',
                        location:'',
                        taluka: '',
                        village: '',
                        survey: '',
                        totalArea:'',
                    },
                    remarks: '',
                    landPDF: '',
                    bondTime: '',
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

    var states = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
                    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa",
                    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
                    "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
                    "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura",
                    "Uttaranchal", "Uttar Pradesh", "West Bengal"];
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
                    <label className="add-label">Percentage of Land Price</label>
                    <input className="add-input" type="number" name="percentage" onChange={handleChangeExpectedProfit("percentage")} value={expectedProfit.percentage} placeholder="Percentage of land Price" min="1" required />

                    <label className="add-label">State</label>
                    <select className="add-input" name="state" onChange={handleChangeLocation("state")} >
                        <option>-- Select --</option>
                        {states.map((state, index) => {
                            return ( <option value={state} key={state} >{state}</option> )
                        })}
                    </select>
                    <label className="add-label">District</label>
                    <input className="add-input" type="text" name="district" onChange={handleChangeLocation("district")} value={landProperties.district} placeholder="District" />
                    <label className="add-label">Taluka</label>
                    <input className="add-input" type="text" name="taluka" onChange={handleChangeLocation("taluka")} value={landProperties.taluka} placeholder="Taluka" />
                    <label className="add-label">Village</label>
                    <input className="add-input" type="text" name="village" onChange={handleChangeLocation("village")} value={landProperties.village} placeholder="Village" />
                    <label className="add-label">Survey No.</label>
                    <input className="add-input" type="number" name="survey" onChange={handleChangeLocation("survey")} value={landProperties.survey} placeholder="Survey No." />
                    <label className="add-label">Area</label>
                    <input className="add-input" type="number" name="totalArea" onChange={handleChangeLocation("totalArea")} value={landProperties.totalArea} placeholder="Land Area (In acres)" min="1" required />
                    <label className="add-label">Address</label>
                    <input className="add-input" type="text" name="location" onChange={handleChangeLocation("location")} value={landProperties.location} placeholder="Location" required />

                    <label className="add-label">Bond Time (in months)</label>
                    <input className="add-input" type="number" name="bondTime" onChange={handleChange("bondTime")} value={bondTime} placeholder="Bond Time (in months)" min="1" required />

                    <label className="add-label" >Land Image </label>
                    <input className="add-input" type="file" name="photo" accept="image/*" placeholder="Choose A Photo" onChange={handleChange("photo")} />

                    <label className="add-label">Remarks</label>
                    <input className="add-input" type="text" name="remarks" onChange={handleChangeLocation("remarks")} value={remarks} placeholder="Any Additional Remarks" />

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
