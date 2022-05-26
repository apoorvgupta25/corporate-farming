import React, {useState, useEffect}  from "react";
import {useParams} from 'react-router-dom';

import {API} from '../../backend';
import {getLand} from './landAPICall'
import {isAuth} from '../../auth/authAPICalls';

import Topbar from "../topbar/topbar";
import ChatNowButton from "../chatNowButton/chatNowButton";
import ThreeDotsWave from '../animation/ThreeDotsWave';
import '../land_product_style.css';

const Land = () => {

    const { landId } = useParams();

    const [land, setLand] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadLand = landId => {
        getLand(landId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLand(data);
            }
            setLoading(false);
        })
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        loadLand(landId);
    },[])

    if (isLoading){
        return <ThreeDotsWave/>;
    }

    var imageURL = `${API}/land/photo/${land._id}`;

    function s1() {

        const b1 = document.getElementById("btn1");
        const b2 = document.getElementById("btn2");
        const b3 = document.getElementById("btn3");
        const sec1 = document.getElementById("section1");
        const sec2 = document.getElementById("section2");
        const sec3 = document.getElementById("section3");
        b2.classList.remove("active");
        b3.classList.remove("active");

        sec2.style.display = "none";
        sec3.style.display = "none";

        sec1.style.display = "block";
        b1.addClass("active");
    }

    function s2() {

        const b1 = document.getElementById("btn1");
        const b2 = document.getElementById("btn2");
        const b3 = document.getElementById("btn3");
        const sec1 = document.getElementById("section1");
        const sec2 = document.getElementById("section2");
        const sec3 = document.getElementById("section3");

        b1.classList.remove("active");
        b3.classList.remove("active");

        sec1.style.display = "none";
        sec3.style.display = "none";

        sec2.style.display = "block";
        b2.addClass("active");

    }

    function s3() {

        const b1 = document.getElementById("btn1");
        const b2 = document.getElementById("btn2");
        const b3 = document.getElementById("btn3");
        const sec1 = document.getElementById("section1");
        const sec2 = document.getElementById("section2");
        const sec3 = document.getElementById("section3");

        b1.classList.remove("active");
        b2.classList.remove("active");

        sec1.style.display = "none";
        sec2.style.display = "none";

        sec3.style.display = "block";
        b3.addClass("active");
    }

    return (
        <>
        <Topbar/>
        <div>
            <div className="card-wrapper" >
                <div className="card">
                    <div className="img-container">
                        <img src={imageURL} alt="Land" className="image-styling" />
                    </div>

                    <div className="content">
                        <h2 className="title">{land.title}</h2>
                        <div className="pull-right">
                            <a href={`${API}/land/pdf/${land._id}`} target="_blank" rel="noreferrer">Land Record PDF</a>
                        </div>
                        <div className="price">
                            <h3>₹ {land.expectedProfit.exactAmount} ({land.expectedProfit.percentage} %)</h3>
                        </div>
                        <div>
                            <h5>🕒 : {land.bondTime} months</h5>
                        </div>

                        <div className="my-3">
                            <h3>Land Description </h3>
                            <h5>{land.description}</h5>
                        </div>

                        <div className="btn-group btn-group-lg" style={{width: '100%'}}>
                            <button type="button" onClick={s1} id="btn1" className="btn btn-primary segmentedButton active">Land Details</button>
                            <button type="button" onClick={s2} id="btn2" className="btn btn-primary segmentedButton">Land Records Details</button>
                            <button type="button" onClick={s3} id="btn3" className="btn btn-primary segmentedButton">Farmer Details</button>
                        </div>

                        <div id="section1" style={{display: 'block', marginTop:'1rem'}} >
                            <h4><b>Land Size (in acres)</b>: {land.landProperties.totalArea}</h4>
                            <h4><b>State</b>: {land.landProperties.state}</h4>
                            <h4><b>Address 📍</b>: {land.landProperties.location}</h4>
                        </div>
                        <div id="section2" style={{display: 'none', marginTop:'1rem'}}>
                            <h4><b>District</b>: {land.landProperties.district}</h4>
                            <h4><b>Taluka</b>: {land.landProperties.taluka}</h4>
                            <h4><b>Village</b>: {land.landProperties.village}</h4>
                            <h4><b>Survey No</b>: {land.landProperties.survey}</h4>
                        </div>
                        <div id="section3" style={{display: 'none', marginTop:'1rem'}}>
                            <h4>🤵: {land.farmer.name}</h4>
                            <h4>📱: +91 {land.farmer.contact}</h4>
                            <h4>✉: {land.farmer.email}</h4>
                        </div>

                        {isAuth() && isAuth().user.role===1 && isAuth().user.verification==="Verified" &&(
                            <div className="d-flex justify-content-center">
                                <ChatNowButton userId={land.farmer._id} productId={land._id} productName={land.title} isProd="0"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>

    )

}

export default Land;
