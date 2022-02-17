import './App.css';
import React from "react";
import './App.scss';

function App() {
  return (
    <div className="wrapper">
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
    </div>
  );
}

function Card(props) {
  return (
    <div className="land" onclick="land_details.html">
      <img src={props.img} className="land__img" />
      <div className="land__body">
        <h2 className="land__title">{props.title}</h2>
        <p className="land__location">{props.location}</p>
        <p className="land__duration">{props.duration}</p>
        <p className="land__size">{props.size}</p>
        <h3 className="land__price">{props.price}</h3>
      </div>
    </div>
  );
}

export default App;