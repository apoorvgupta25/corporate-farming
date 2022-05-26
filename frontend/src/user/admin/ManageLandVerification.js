import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Person } from "@material-ui/icons";

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import {getLandVerificationEnums, updateLandVerification, getUnverifiedLands, getVerifiedLands, getInvalidLands } from './adminAPICall';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

import './manageVerification.css';

import { ReactComponent as Elink }  from '../../assets/external-link.svg'

const ManageLandVerification = () => {

    const [lands, setLands] = useState([])
    const [verifiedLands, setVerifiedLands] = useState([])
    const [invalidLands, setInvalidLands] = useState([])
    const [loading, setLoading] = useState(true)

    const [statusEnums, setStatusEnums] = useState([])

    const {user, token} = isAuth();

    const preload = () => {

        getUnverifiedLands(user._id, token)
        .then(data => {
            setLands(data)
            setLoading(false);
        });

        getVerifiedLands(user._id, token)
        .then(data => {
            setVerifiedLands(data)
            setLoading(false);
        });

        getInvalidLands(user._id, token)
        .then(data => {
            setInvalidLands(data)
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
        getEnums();
    }, []);

    const getEnums = () => {
        getLandVerificationEnums(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setStatusEnums(data);
            }
        })
    }

    const handleChange = landId => event => {
        const landIdStatus = {
            "landId": landId,
            "verification":event.target.value
        }

        updateLandVerification(landId, user._id, token, landIdStatus)
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

    const Land = ({land}) => {
        return (
            <div className="land-list-item row">
                <div className="col-6 ml-0 pl-0">
                    <div className="h4 font-weight-bold">{land.title}</div>
                    <div className="h5"><b>State </b>: {land.landProperties.state}</div>
                    <div className="h5"><b>District </b>: {land.landProperties.district}</div>
                    <div className="h5"><b>Taluka </b>: {land.landProperties.taluka}</div>
                    <div className="h5"><b>Village </b>: {land.landProperties.village}</div>
                    <div className="h5"><b>Survey No. </b>: {land.landProperties.survey}</div>
                    <div className="h5"><b>Total Land Area </b>: {land.landProperties.totalArea} Acres</div>
                </div>

                <div className="col-6">
                    <div className="h5"><a href={`${API}/land/pdf/${land._id}`} target="_blank" rel="noreferrer" ><b>Land Record PDF </b> </a> </div>
                    <div className="h5"><b>Name </b>: {land.farmer.name}</div>
                    <div className="h5"><b>Contact </b>: {land.farmer.contact}</div>
                    <div className="h5"><b>Email </b>: {land.farmer.email}</div>
                    <select className="enumSelect " placeholder="Status" onChange={handleChange(land._id) }>
                        <option>{land.verification}</option>
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
                Verify Land Records
                <a href="https://dilrmp.gov.in/faces/rptPhysicalHome/rptStateRoRonWebDetail.xhtml" target="_blank" rel="noreferrer" >
                 <Elink style={{width:"1.5rem", marginLeft:"1rem"}}/>
                </a>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Unverified Lands</div>
                        {lands.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Lands to Show
                            </div>
                        )}
                        {lands.length > 0 && lands.map((land, index) => {
                            return (
                                <div key={index}> <Land land={land}/> </div>
                            )
                        })}
                    </div>

                </div>

                <div className="col-6">
                    <div className="verification-container">
                        <div className="h2 mt-3">Verified Lands</div>
                        {verifiedLands.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Lands to Show
                            </div>
                        )}
                        {verifiedLands.length > 0 && verifiedLands.map((land, index) => {
                            return (
                                <div key={index}> <Land land={land}/> </div>
                            )
                        })}
                    </div>

                    <div className="verification-container">
                        <div className="h2 mt-3">Invalid Lands</div>
                        {invalidLands.length === 0 && (
                            <div className="text-center h3 font-weight-bold">
                                No Lands to Show
                            </div>
                        )}
                        {invalidLands.length > 0 && invalidLands.map((land, index) => {
                            return (
                                <div key={index}> <Land land={land}/> </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ManageLandVerification;
