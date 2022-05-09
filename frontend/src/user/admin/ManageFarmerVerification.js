import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import { Person } from "@material-ui/icons";

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import {getUnverifiedFarmers, getVerifiedFarmers, getInvalidFarmers, getVerificationEnums, updateVerification} from './adminAPICall';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

import './manageVerification.css';

import { ReactComponent as Elink }  from '../../assets/external-link.svg'

const ManageFarmerVerification = () => {

    const [farmers, setFarmers] = useState([])
    const [verifiedFarmers, setVerifiedFarmers] = useState([])
    const [invalidFarmers, setInvalidFarmers] = useState([])
    const [loading, setLoading] = useState(true)

    const [statusEnums, setStatusEnums] = useState([])
    const [showSelect, setShowSelect] = useState(false)

    const {user, token} = isAuth();

    const preload = () => {
        getUnverifiedFarmers(user._id, token)
        .then(data => {
            setFarmers(data)
            setLoading(false);
        });

        getVerifiedFarmers(user._id, token)
        .then(data => {
            setVerifiedFarmers(data)
            setLoading(false);
        });

        getInvalidFarmers(user._id, token)
        .then(data => {
            setInvalidFarmers(data)
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
        getEnums();
    }, []);

    const getEnums = () => {
        getVerificationEnums(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setStatusEnums(data);
                setShowSelect(true);
            }
        })
    }

    const handleChange = usersId => event => {
        const usersIdStatus = {
            "usersId": usersId,
            "verification":event.target.value
        }

        updateVerification(usersId, user._id, token, usersIdStatus)
        .then(data => {
            if(data.error)
                console.log(data.error);
            else{
                setLoading(true);
                preload();
            }
        })
    }

    if (loading){
        return <ThreeDotsWave/>;
    }

    const Farmer = ({farmer}) => {

        const profileImage = () => {
            return (
                <img src={`${API}/user/profile/photo/${farmer._id}`} alt="Profile Image" className="profile-image" style={{height: "210px"}}/>
            )
        }
        return (
            <div className="farmer-list-item row">
                <div className="col-6 ml-0 pl-0">
                    <div className="h3 font-weight-bold">{farmer.name}</div>
                    <div className="h5"><b>Age</b>: {farmer.age}</div>
                    <div className="h5"><b>Gender</b>: {farmer.gender}</div>
                    <div className="h5"><b>State</b>: {farmer.state}</div>
                    <div className="h5"><b>Aadhaar</b>: {farmer.aadhaar}</div>
                    <div className="h5"><b>Contact</b>: {farmer.contact}</div>
                    <select className="enumSelect" placeholder="Status" onChange={handleChange(farmer._id) }>
                        <option>{farmer.verification}</option>
                        {statusEnums.map((stat, index) => {
                            return (
                              <option value={stat} key={index}>{stat}</option>
                              )
                            })
                        }
                    </select>
                </div>

                <div className="col-6 my-auto">
                {profileImage()}

                </div>

            </div>
        )
    }

    return (
        <div className="text-dark" style={{overflowX:'hidden'}} >
            <Topbar/>
            <Link className="btn btn-primary ml-3 mt-3" to={`/admin/dashboard/${user._id}`}> <Person/> Dashboard</Link>

            <div className="text-center h1">
                Verify Aadhaar Numbers
                <a href="https://myaadhaar.uidai.gov.in/verifyAadhaar" target="_blank">
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Unverified Farmers</div>
                        {farmers.length == 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Farmers to Show
                            </div>
                        )}
                        {farmers.length > 0 && farmers.map((farmer, index) => {
                            return (
                                <div key={index}>
                                    <Farmer farmer={farmer}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Verified Farmers</div>
                        {verifiedFarmers.length == 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Farmers to Show
                            </div>
                        )}
                        {verifiedFarmers.length > 0 && verifiedFarmers.map((farmer, index) => {
                            return (
                                <div key={index}>
                                    <Farmer farmer={farmer}/>
                                </div>
                            )
                        })}
                    </div>

                    <div className="verification-container">
                        <div className="h2 mt-3">Invalid Farmers</div>
                        {invalidFarmers.length == 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Farmers to Show
                            </div>
                        )}
                        {invalidFarmers.length > 0 && invalidFarmers.map((farmer, index) => {
                            return (
                                <div key={index}>
                                    <Farmer farmer={farmer}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageFarmerVerification;
