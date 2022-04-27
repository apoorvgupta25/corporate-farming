import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';
import Topbar from '../component/topbar/topbar';
import './corporate_dashboard.css';

const CorporateDashboard = ({ match }) => {

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email, role}} = isAuth();


    var roleType = "Farmer";
    if(role === 1)
        roleType = "Corporate";

    const adminRightSide = () => {
        return (
            <div className="mb-4">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Name</div> {name}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Email</div> {email}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Role</div> {roleType}
                    </li>
                </ul>
                <Link to="/signin" onClick={signoutUser} className="btn btn-primary mt-3 pull-right text-white">Sign Out</Link>
            </div>
        );
    };

    return (

        <div className="">
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Dashboard</h1>
            <div className="container bg-success p-3">
                <div className="row">
                    <div className="col-sm-12">{adminRightSide()}</div>
                </div>
            </div>

        </div>
    );
}

export default CorporateDashboard;
