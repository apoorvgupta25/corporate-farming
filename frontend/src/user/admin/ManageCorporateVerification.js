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

const ManageCorporateVerification = () => {

    const [corporates, setCorporates] = useState([])
    const [verifiedCorporates, setVerifiedCorporates] = useState([])
    const [invalidCorporates, setInvalidCorporates] = useState([])
    const [loading, setLoading] = useState(true)

    const [statusEnums, setStatusEnums] = useState([])
    const [showSelect, setShowSelect] = useState(false)

    const {user, token} = isAuth();

    const preload = () => {

        getUnverifiedCorporates(user._id, token)
        .then(data => {
            setCorporates(data)
            setLoading(false);
        });

        getVerifiedCorporates(user._id, token)
        .then(data => {
            setVerifiedCorporates(data)
            setLoading(false);
        });

        getInvalidCorporates(user._id, token)
        .then(data => {
            setInvalidCorporates(data)
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

    return (
        <div className="text-dark">
            <Topbar/>

            <div className="text-center h1 mt-3">
                Verify Corporate Identification Numbers
                <a href="https://www.quickcompany.in/company" target="_blank">
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="farmer-container">
                        <div className="h2 mt-3">Unverified Corporates</div>
                        {corporates.map((corporate, index) => {
                            return (
                                <div key={index}>
                                    <div className="farmer-list-item">
                                        <div className="item-name">{corporate.name}</div>
                                        <div className="item-aadhaar"> {corporate.cin} </div>
                                        <select className="enumSelect" placeholder="Status" onChange={handleChange(corporate._id) }>
                                            <option>{corporate.verification}</option>
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
                        })}
                    </div>

                </div>

                <div className="col-6">
                    <div className="farmer-container">
                        <div className="h2 mt-3">Verified Corporates</div>
                        {verifiedCorporates.map((corporate, index) => {
                            return (
                                <div key={index}>
                                    <div className="farmer-list-item">
                                        <div className="item-name">{corporate.name}</div>
                                        <div className="item-aadhaar"> {corporate.cin} </div>
                                        <select className="enumSelect" placeholder="Status" onChange={handleChange(corporate._id) }>
                                            <option>{corporate.verification}</option>
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
                        })}
                    </div>

                    <div className="farmer-container">
                        <div className="h2 mt-3">Invalid Corporates</div>
                        {invalidCorporates.map((corporate, index) => {
                            return (
                                <div key={index}>
                                    <div className="farmer-list-item">
                                        <div className="item-name">{corporate.name}</div>
                                        <div className="item-aadhaar"> {corporate.cin} </div>
                                        <select className="enumSelect" placeholder="Status" onChange={handleChange(corporate._id) }>
                                            <option>{corporate.verification}</option>
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
                        })}

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ManageCorporateVerification;
