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

    const {soil, humidity, rainfall, temperature} = values;

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
    <div className="add-main bg-cont-farm">
        <div className="add-container mx-auto">

            <form method="GET" className="add-form" id="land-form">
                <h2 className="add-heading" align="center">Crop Prediction</h2>

                <label className="add-label">Rainfall</label>
                <input className="add-input" type="number" name="rainfall" onChange={handleChange("rainfall")} value={rainfall} placeholder="Rainfall in area (mm)" min="1" required />
                <label className="add-label">Humidity</label>
                <input className="add-input" type="number" name="humidity" onChange={handleChange("humidity")} value={humidity} placeholder="Humidity (%)" min="1" required />
                <label className="add-label">Temperature</label>
                <input className="add-input" type="number" name="humidity" onChange={handleChange("temperature")} value={temperature} placeholder="Temperature (°C)" min="1" required />
                <label className="add-label">Nitrogen</label>
                <input className="add-input" type="number" name="nitrogen" onChange={handleChangeSoil("nitrogen")} value={soil.nitrogen} placeholder="Land Nitrogen Content" min="1" required />
                <label className="add-label">Phosphorous</label>
                <input className="add-input" type="number" name="phosphorous" onChange={handleChangeSoil("phosphorous")} value={soil.phosphorous} placeholder="Land Phosphorous Content" min="1" required />
                <label className="add-label">Potassium</label>
                <input className="add-input" type="number" name="potassium" onChange={handleChangeSoil("potassium")} value={soil.potassium} placeholder="Land Potassium Content" min="1" required />
                <label className="add-label">pH</label>
                <input className="add-input" type="number" name="ph" onChange={handleChangeSoil("ph")} value={soil.ph} placeholder="Land PH " min="1" required />

                <div className="form-button">
                    <input className="btn btn-primary w-100" type="submit" name="submit" onClick={onSubmit} value="Submit" />
                </div>
            </form>
            {successMessage()}
        </div>
    </div>
    </div>
);
}
