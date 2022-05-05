import "./topbar.css";
import { Search, Person, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

import {isAuth, signout} from '../../auth/authAPICalls';
import logo from '../../assets/logo/corp-farm-logo.png';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
            <img className="logoImg" src={logo}/>
            <div className="logo">Corp-Farm</div>
        </Link>
      </div>
      <div className="topbarCenter">
          <div className="topbarLinks">
              <Link to={`/disease/prediction/`} className="topbarLink">Disease Prediction</Link>
              <Link to={`/crop/prediction/`} className="topbarLink">Crop Prediction</Link>
              <a href="https://weather-forecast-corp.herokuapp.com/" target="_blank" className="topbarLink">Weather Prediction</a>
              <Link to={`/cost/prediction`} className="topbarLink">Cost Prediction</Link>

              {!isAuth() && (
                <Link to="/signin" className="topbarLink">SignIn</Link>
              )}
              {!isAuth() && (
                <Link to="/signup/farmer" className="topbarLink">SignUp</Link>
              )}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
          {isAuth() && (
             <Link to={`/messenger`} style={{ textDecoration:'none', color: 'white'}}>
               <Chat />
            </Link>
          )}
          </div>
          <div className="topbarIconItem">
          {isAuth() && isAuth().user.role === 0 && (
            <Link to={`/farmer/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}>
              <Person />
            </Link>
          )}
          {isAuth() && isAuth().user.role === 1 && (
            <Link to={`/corporate/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}>
              <Person />
            </Link>
          )}

          {isAuth() && isAuth().user.role === 2 && (
            <Link to={`/admin/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'white'}}>
              <Person />
            </Link>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
