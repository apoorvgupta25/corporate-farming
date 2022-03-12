import './App.css';
import React from "react";
import './App.scss';

function App() {
  return (
    <div className="wrapper">
      <Card
        img="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHxlbnwwfHwwfHw%3D&w=1000&q=80"
        title="Chikoo"
        location="Jalgaon"
        delmonth="1 month"
        cropName="Chikoo"
        price="45000"
      />

      <Card
        img="https://img.wallpapersafari.com/desktop/1280/1024/41/24/tET15Z.jpg"
        title="Bananas"
        location="Amravati"
        delmonth="1 month"
        cropName="Chikoo"
        price="20000"
      />
      <Card
        img="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        title="Apples"
        location="Akola"
        delmonth="1 month"
        cropName="Chikoo"
        price="24990"
      />
      <Card
        img="https://www.investopedia.com/thmb/ORMhEo44tHDwWBJvXtcR664DC88=/3400x1912/smart/filters:no_upscale()/getty-large-farm-landscape-56c0a6aa5f9b5829f867287c.jpg"
        title="Tomatoes"
        location="Jalgaon"
        delmonth="1 month"
        price="19"
        cropName="Tomatoes"
      />
    </div>
  );
}

function Card(props) {
  return (
    <div className="product">
      <img src={props.img} className="product__img" />
      <div className="product__body">
        <h2 className="product__title">{props.title}</h2>
        <p className="product__cropName">{props.cropName}</p>
        <p className="product__location">{props.location}</p>
        <p className="product__delmonth">{props.delmonth}</p>
        <h3 className="product__price">{props.price}</h3>
      </div>
    </div>
  );
}

export default App;