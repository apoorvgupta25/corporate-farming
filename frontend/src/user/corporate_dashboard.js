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

    const adminLeftSide = () => {
        return (
            <div>
                <h4 className="card-header bg-dark"><Link to="/" style={{ textDecoration:'none', color: 'white'}}>Corp-Farm</Link></h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create" className="text-success" style={{ textDecoration:'none'}}>Create</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="mb-4">
                <h4 className="bg-dark text-white card-header">Info</h4>
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
            <div className="container bg-warning p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-9">{adminRightSide()}</div>
                </div>
            </div>

        </div>
    );
}

export default CorporateDashboard;
