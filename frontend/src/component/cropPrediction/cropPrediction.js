import Topbar from "../topbar/topbar";

import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {getcropPrediction} from "./cropPredictionAPICall";
import '../../user/farmer/add.css';



export default function CropPrediction() {

    const [result, setResults] = useState();
    const [error, setError] = useState(false);
   
    
    const [values, setValues] = useState({
        temperature: '',
        humidity: '',
        rainfall: '',
        soil:{
            nitrogen:'',
            phosphorous:'',
            potassium:'',
            ph:'',
        },
        error: '',
        formData: new FormData()
    });

    const {
        soil,
        humidity,
        rainfall,
        temperature,
    } = values;

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }
    
    const handleChangeSoil = name => event => {
        setValues({
            ...values,
            soil: {
                ...values.soil,
                [name]: event.target.value
            }
        });
    }    
    
    const onSubmit = event => {  
        event.preventDefault() 
        getcropPrediction(soil.nitrogen,soil.phosphorous,soil.potassium,soil.ph,humidity,rainfall,temperature)
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setResults(data.prediction);
            }
        })
    }
    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{display: result ? "" : "none"}}>
                <h4>Predicted crop: {result} </h4>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" style={{display: error ? "" : "none"}}>
                <h4>{error}</h4>
            </div>
        )
    }

return (
    <div>
        <Topbar/>

        {errorMessage()}
    <div className="add-main bg-cont-land">
        <div className="add-container">

            <form method="GET" className="add-form" id="land-form">
                <h2 className="add-heading" align="center">Crop Prediction</h2>

                <div className="form-group-1">
                   

                    <input className="add-input-select" type="number" name="rainfall" onChange={handleChange("rainfall")} value={rainfall} placeholder="Rainfall in area (mm)" min="1" required />
                    <input className="add-input-select" type="number" name="humidity" onChange={handleChange("humidity")} value={humidity} placeholder="Humidity in percentage" min="1" required />
                    <input className="add-input-select" type="number" name="humidity" onChange={handleChange("temperature")} value={temperature} placeholder="Temperature in degree celsius" min="1" required />
                    <input className="add-input-select" type="number" name="nitrogen" onChange={handleChangeSoil("nitrogen")} value={soil.nitrogen} placeholder="Land Nitrogen Content" min="1" required />
                    <input className="add-input-select" type="number" name="phosphorous" onChange={handleChangeSoil("phosphorous")} value={soil.phosphorous} placeholder="Land Phosphorous Content" min="1" required />
                    <input className="add-input-select" type="number" name="potassium" onChange={handleChangeSoil("potassium")} value={soil.potassium} placeholder="Land Potassium Content" min="1" required />
                    <input className="add-input-select" type="number" name="ph" onChange={handleChangeSoil("ph")} value={soil.ph} placeholder="Land PH " min="1" required />

                </div>
                <div className="form-submit" style={{marginTop: '10%', marginLeft: '40%'}}>
                    <input className="add-input-select" type="submit" name="submit" onClick={onSubmit} value="Submit" />
                </div>
            </form>
            {successMessage()}
        </div>
    </div>
    </div>
);
}