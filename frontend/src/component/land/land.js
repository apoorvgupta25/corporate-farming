import React, {useState, useEffect}  from "react";

import {getLand} from './landAPICall'
import {useParams} from 'react-router-dom';
import {API} from '../../backend';

// import './land.css';
import '../land_product_style.css';

const Land = () => {

    const { landId } = useParams();

    const [land, setLand] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadLand = landId => {
        getLand(landId)
        .then(data => {
            if (data.error) {
                setLoading(false);
            } else {
                setLand(data);
                setLoading(false);
            }
        })
    };

    useEffect(() => {
        loadLand(landId);
    },[])

    if (isLoading){
        return <div>Loading...</div>;
    }

    var imageURL = `${API}/land/photo/${land._id}`;

    return (
        <div className="">
            <div className="card-wrapper" >
                <div className="card">

                    <div className="imgs">
                        <img src={imageURL} alt="Land image" style={{height:'100%',borderRadius: '20px'}} className="img" />
                    </div>

                    <div className="content">
                        <h2 className="title">{land.title}</h2>

                        <div className="price">
                            <h3>₹ {land.expectedProfit.exactAmount} ({land.expectedProfit.percentage} %)</h3>
                        </div>
                        <div>
                            <h5>🕒 : {land.bondTime}</h5>
                        </div>

                        <div className="detail">
                            <h3>Land Description </h3>
                            <p>{land.description}</p>
                        </div>

                        <div className="btn-group btn-group-lg" style={{width: '100%'}}>
                            <button type="button" data-section="section1" className="btn btn-primary segmentedButton active">Land Details</button>
                            <button type="button" data-section="section2" className="btn btn-primary segmentedButton">Soil Details</button>
                            <button type="button" data-section="section3" className="btn btn-primary segmentedButton">Farmer Details</button>
                        </div>

                        <div className="content-section" id="section1" style={{display: 'block'}}>
                            <h4>Land Size (in acres): {land.landProperties.totalArea}</h4>
                            <h4>Rainfall: {land.rainfall} mm</h4>
                            <h4>📍: {land.landProperties.city}, {land.landProperties.state}</h4>
                            <h4>{land.landProperties.location}</h4>
                        </div>
                        <div className="content-section" id="section2">
                            <h4>Nitrogen: {land.soil.nitrogen}</h4>
                            <h4>Phosphorus: {land.soil.phosphorous}</h4>
                            <h4>Potassium: {land.soil.potassium}</h4>
                            <h4>pH: {land.soil.ph}</h4>
                        </div>
                        <div className="content-section" id="section3">
                            <h4>🤵: {land.farmer.name}</h4>
                            <h4>📱: 999459545</h4>
                            <h4>✉: rahul.mahadik@gmail.com</h4>
                        </div>

                        <div className="purchase-info" >
                            <button type="button" className="btn" style={{fontSize:'x-large'}}>
                                Bid Now <i className="fas fa-gavel"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Land;
