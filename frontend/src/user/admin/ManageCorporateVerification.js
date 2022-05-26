import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Person } from "@material-ui/icons";

import {isAuth} from '../../auth/authAPICalls';
import {getVerificationEnums, updateVerification, getUnverifiedCorporates, getVerifiedCorporates, getInvalidCorporates } from './adminAPICall';
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
            }
        })
    }

    console.log(loading);
    const handleChange = usersId => event => {
        const usersIdStatus = {
            "usersId": usersId,
            "verification":event.target.value
        }

        updateVerification(usersId, user._id, token, usersIdStatus)
        .then(data => {
            if(data.error)
                console.log(data.error);
            else {
                setLoading(true);
                preload();
            }
        })
    }

    if (loading){
        return <ThreeDotsWave/>;
    }

    const Corporate = ({corporate}) => {
        return (
            <div className="corporate-list-item row ">
                <div className="col-8 ml-0 pl-0">
                    <div className="h4 font-weight-bold">{corporate.name}</div>
                    <div className="h5">CIN : {corporate.cin}</div>

                </div>

                <div className="col-4">
                    <select className="enumSelect " placeholder="Status" onChange={handleChange(corporate._id) }>
                        <option>{corporate.verification}</option>
                        {statusEnums.map((stat, index) => {
                                return ( <option value={stat} key={index}>{stat}</option> )
                            })
                        }
                    </select>
                </div>

            </div>
        )
    }

    return (
        <div className="text-dark" style={{overflowX:'hidden'}}>
            <Topbar/>
            <Link className="btn btn-primary ml-3 mt-3" to={`/admin/dashboard/${user._id}`}> <Person/> Dashboard</Link>

            <div className="text-center h1">
                Verify Corporate Identification Numbers
                <a href="https://www.quickcompany.in/company" target="_blank"  rel="noreferrer">
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Unverified Corporates</div>
                        {corporates.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Corporates to Show
                            </div>
                        )}
                        {corporates.length > 0 && corporates.map((corporate, index) => {
                            return (
                                <div key={index}> <Corporate corporate={corporate}/> </div>
                            )
                        })}
                    </div>

                </div>

                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Verified Corporates</div>
                        {verifiedCorporates.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Corporates to Show
                            </div>
                        )}
                        {verifiedCorporates.length > 0 && verifiedCorporates.map((corporate, index) => {
                            return (
                                <div key={index}> <Corporate corporate={corporate}/> </div>
                            )
                        })}
                    </div>

                    <div className="verification-container">
                        <div className="h2 mt-3">Invalid Corporates</div>
                        {invalidCorporates.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Corporates to Show
                            </div>
                        )}
                        {invalidCorporates.length > 0 && invalidCorporates.map((corporate, index) => {
                            return (
                                <div key={index}> <Corporate corporate={corporate}/> </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ManageCorporateVerification;
