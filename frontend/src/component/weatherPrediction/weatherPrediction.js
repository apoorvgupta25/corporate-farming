import React, {useState, useEffect}  from "react";
import {Link} from 'react-router-dom';

import ThreeDotsWave from '../animation/ThreeDotsWave';
import Topbar from "../topbar/topbar";

const WeatherPrediction = () => {


    return (
        <>
        <Topbar/>
		<div className="h1 text-center">
		    Weather Prediction
		</div>
        </>

    )

}

export default WeatherPrediction;
