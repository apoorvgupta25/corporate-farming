import React, {useState, useEffect}  from "react";

import './home.css';
import './home.scss';

import {getRecent3Lands, getRecent3Products} from './homeAPICall'
import Navbar from '../Navbar';

import {API} from '../../backend';

function Home() {

    const [lands, setLands] = useState([]);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);

    const getLandData = () => {
        getRecent3Lands()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
                setLands(data);
            }
        })
    };

    const getProductData = () => {
        getRecent3Products()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
                setProduct(data);
            }
        })
    };

    console.log(lands);
    useEffect(() => {
        getLandData()
        getProductData()
    },[])

      return (
          <div>
            <Navbar/>
            <div className="wrapper">

                {lands.map((land, index) => {
                    return (
                        <div key={index}>
                            <Card land={land}/>
                        </div>
                    )
                })}

            </div>
          </div>
      );
}

function Card({land}) {

    var title = "title";
    var location = "description";
    var duration = "date";
    var imageURL = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg";
    var landSize = "title";
    var price = "title";

    if(land._id){
        title = land.title;
        location = land.landProperties.city;
        duration = land.bondTime;
        landSize = land.landProperties.totalArea;
        price = land.expectedProfit.exactAmount;
        imageURL = `${API}/land/photo/${land._id}`;
    }

    return (
        <div className="land">
            <img className="land__img" src={imageURL} />
            <div className="land__body">
                <h2 className="land__title">{title}</h2>
                <p className="land__location">{location}</p>
                <p className="land__duration">{duration}</p>
                <p className="land__size">{landSize}</p>
                <h3 className="land__price">{price}</h3>
            </div>
        </div>
    );
}

export default Home;

/*
<Card
    img="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHxlbnwwfHwwfHw%3D&w=1000&q=80"
    title="Rice Land in Jalgaon"
    location="Jalgaon"
    size="10 acres"
    duration="1 month"
    price="45000"
/>
<Card
    img="https://img.wallpapersafari.com/desktop/1280/1024/41/24/tET15Z.jpg"
    title="10 Acre land at 20000"
    location="Amravati"
    size="10 acres"
    duration="1 month"
    price="20000"
/>
<Card
    img="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    title="Wheat Farm in Akola"
    location="Akola"
    size="10 acres"
    duration="1 month"
    price="24990"
/>
<Card
    img="https://www.investopedia.com/thmb/ORMhEo44tHDwWBJvXtcR664DC88=/3400x1912/smart/filters:no_upscale()/getty-large-farm-landscape-56c0a6aa5f9b5829f867287c.jpg"
    title="Tomato Field"
    location="Jalgaon"
    size="10 acres"
    duration="1 month"
    price="19950"
    onClick="land_details.html"
/>
*/
