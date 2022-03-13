import React, {useState, useEffect}  from "react";

import {getProduct} from './productAPICall'
import {useParams} from 'react-router-dom';
import {API} from '../../backend';
import Navbar from '../Navbar';

// import './product.css';
import '../land_product_style.css';

const Product = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadProduct = productId => {
        getProduct(productId)
        .then(data => {
            if (data.error) {
                setLoading(false);
            } else {
                setProduct(data);
                setLoading(false);
            }
        })
    };

    useEffect(() => {
        loadProduct(productId);
    },[])

    if (isLoading){
        return <div>Loading...</div>;
    }

    // No Land Details
    // Farmer Contact Number

    var imgsrc = 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg';

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
        <Navbar/>
        <div className="card-wrapper">
            <div className="card">
                <div className="imgs">
                    <img src={imgsrc} alt = "Product image" style={{height:'100%',borderRadius: '20px'}} className="img" />
                </div>

                <div className="content">
                    <h2 className="title">{product.title}</h2>

                    <div className="price">
                        <h3>₹ {product.price}</h3>
                    </div>
                    <div>
                        <h5>🌿: {product.cropName} - {product.cropSubType}</h5>
                    </div>

                    <div className="detail">
                        <h3>Product Description </h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="btn-group btn-group-lg" style={{width: '100%'}}>
                        <button type="button" onClick={s1} id="btn1" className="btn btn-primary segmentedButton active">Product Details</button>
                        <button type="button" onClick={s2} id="btn2" className="btn btn-primary segmentedButton">Land Details</button>
                        <button type="button" onClick={s3} id="btn3" className="btn btn-primary segmentedButton">Farmer Details</button>
                    </div>

                    <div id="section1" style={{display: 'block'}}>
                        <h4>Order Capacity: {product.minimumOrderQuantity} - {product.maximumOrderQuantity}</h4>
                        <h4>Harvest Month: {product.harvestMonth}</h4>
                        <h4>Delivery Month: {product.deliveryMonth}</h4>
                        <h4>Payment before Harvest: ₹ {product.paymentBeforeharvest}</h4>
                    </div>
                    <div id="section2" style={{display: 'none'}}>
                        <h4>Land Size (in acres): 10</h4>
                        <h4>Rainfall: 10 mm</h4>
                        <h4>📍: Jalgaon</h4>
                    </div>
                    <div id="section3" style={{display: 'none'}}>
                        <h4>🤵: {product.farmer.name}</h4>
                        <h4>📱: 999459545</h4>
                        <h4>✉: rahul.mahadik@gmail.com</h4>
                    </div>

                    <div className="purchase-info">
                        <button type="button" className="btn" style={{fontSize:'x-large'}}>
                        Bid Now <i className="fas fa-gavel"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Product;