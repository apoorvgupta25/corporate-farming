import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {API} from '../backend';

import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';
import Topbar from '../component/topbar/topbar';
import './dashboard.css';
import '../index.css';

import { ReactComponent as Exaclamation }  from '../assets/exaclamation4.svg'

const FarmerDashboard = ({ match }) => {

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email, role, verification, _id, aadhaar, contact, age, gender, state}} = isAuth();

    var roleType = "Farmer";
    if(role === 1)
        roleType = "Corporate";

    const adminLeftSide = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/farmer/add/land" className="text-success" style={{ textDecoration:'none'}}>Create Land</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/manage/land" className=" text-success" style={{ textDecoration:'none'}}>Manage Land</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/add/product" className=" text-success" style={{ textDecoration:'none'}}>Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/manage/product" className=" text-success" style={{ textDecoration:'none'}}>Manage Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/contract/manage/" className=" text-success" style={{ textDecoration:'none'}}>Manage Contracts</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const Detail = ({label, value}) => {
        return (
            <li className="list-group-item">
                <div className="badge badge-success mr-2" style={{fontSize: "14px"}}>{label}</div> {value}
            </li>
        )
    }
    const adminRightSide = () => {
        return (
            <div className="row">
                <div className="col-sm-6 pr-0">
                    <ul className="list-group">
                        <Detail label="Name" value={name}/>
                        <Detail label="Email" value={email}/>
                        <Detail label="Role" value={roleType}/>
                        <Detail label="Status" value={verification}/>
                        <Detail label="Aadhaar" value={aadhaar}/>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <ul className="list-group">
                        <Detail label="Contact No." value={contact}/>
                        <Detail label="Age" value={age}/>
                        <Detail label="State" value={state}/>
                        <Detail label="Gender" value={gender}/>
                    </ul>
                </div>
            </div>
        );
    };

    const profileImage = () => {
        return (
            <>
                <img src={`${API}/user/profile/photo/${_id}`} alt="Profile Image" className="profile-image" />
                <Link to="/signin" onClick={signoutUser} className="btn btn-primary mt-3 w-100">Sign Out</Link>
            </>
        )
    }

    return (
        <div>
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Farmer Dashboard</h1>
            <div className="container bg-green p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-7 pl-0">{adminRightSide()}</div>
                    <div className="col-sm-2 pl-0">{profileImage()}</div>
                </div>
            </div>
            <div className="text-danger text-center font-weight-bold"><Exaclamation style={{width: "1.5rem"}}/>Note: Invalid and Unverified Farmers Cannot Add Land and Products</div>

        </div>
    );
}
export default FarmerDashboard;
