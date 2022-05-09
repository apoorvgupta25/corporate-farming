import React, {useState,useEffect} from 'react';
import {Link, Navigate,useParams,Redirect } from 'react-router-dom';

import {API} from '../backend';
import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';
import Topbar from '../component/topbar/topbar';
import './dashboard.css';
import Cookies from 'universal-cookie';

const AdminDashboard = () => {

    const cookies = new Cookies();
    const otpCookie = cookies.get("OTPVerified");

    const {userId} = useParams();

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email, role, _id}} = isAuth();

    // useEffect(() => {

    //     if (otpCookie != null) {
    //       if (otpCookie != "true") {

    //         const navigate = useNavigate();
    //         navigate(`/verifyOtp/${user._id}`);
    //       }
    //       // const check = () => {
    //       //   return <Link to={ `/admin/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}><Person /></Link>
    //       // }
    //       // check();
    //       // console.log("exist");
    //       // value = check();
    //     }

    // }, []);

    if (otpCookie != null) {
        if (otpCookie != "true") {
            return <Navigate to={`/verifyOtp/${userId}`}  />
        }
    } else {
        return <Navigate to={`/verifyOtp/${userId}`}  />
    }

    var roleType = "Farmer";
    if(role === 2)
        roleType = "Admin";

    const adminLeftSide = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/farmer/verification" className="text-success" style={{ textDecoration:'none'}}>Verify Farmers</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/corporate/verification" className="text-success" style={{ textDecoration:'none'}}>Verify Corporates</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/land/verification" className="text-success" style={{ textDecoration:'none'}}>Verify Land</Link>
                    </li>
                </ul>
            </div>
        );
    };

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
                <Link to="/signin" onClick={signoutUser} className="btn btn-primary mt-3 w-10 pull-right">Sign Out</Link>
            </div>
        );
    };

    return (

        <div className="">
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Admin Dashboard</h1>
            <div className="container bg-green p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-9">{adminRightSide()}</div>
                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;
