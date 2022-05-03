import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import {getUnverifiedFarmers, getVerifiedFarmers, getInvalidFarmers, getVerificationEnums, updateVerification,
    getUnverifiedCorporates, getVerifiedCorporates, getInvalidCorporates } from './adminAPICall';
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
        })
        setLoading(true);
        preload();
    }

    if (loading){
        return <ThreeDotsWave/>;
    }

    const Farmer = ({farmer}) => {

        return (
            <div className="farmer-list-item row">
                <div className="col-6 ml-0 pl-0">
                    <div className="h4 font-weight-bold">{farmer.name}</div>
                    <div className="h5">Age : {farmer.age}</div>
                    <div className="h5">Gender : {farmer.gender}</div>
                    <div className="h5">State : {farmer.state}</div>
                </div>

                <div className="col-6">
                    <div className="h5">Aadhaar : {farmer.aadhaar}</div>
                    <div className="h5">Contact : {farmer.contact}</div>
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

            </div>
        )
    }

    return (
        <div className="text-dark" style={{overflowX:'hidden'}} >
            <Topbar/>

            <div className="text-center h1 mt-3">
                Verify Aadhaar Numbers
                <a href="https://myaadhaar.uidai.gov.in/verifyAadhaar" target="_blank">
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Unverified Farmers</div>
                        {farmers.map((farmer, index) => {
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
                        {verifiedFarmers.map((farmer, index) => {
                            return (
                                <div key={index}>
                                    <Farmer farmer={farmer}/>
                                </div>
                            )
                        })}
                    </div>

                    <div className="verification-container">
                        <div className="h2 mt-3">Invalid Farmers</div>
                        {invalidFarmers.map((farmer, index) => {
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
