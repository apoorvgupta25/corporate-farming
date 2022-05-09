import React, {useState, useEffect}  from "react";
import {useParams} from 'react-router-dom';

import {API} from '../../backend';
import {getProduct} from './productAPICall'
import {isAuth, signout} from '../../auth/authAPICalls';

import Navbar from '../Navbar';
import Topbar from "../topbar/topbar";
import ChatNowButton from "../chatNowButton/chatNowButton";
import ThreeDotsWave from '../animation/ThreeDotsWave';
import '../land_product_style.css';

const Product = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadProduct = productId => {
        getProduct(productId)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProduct(data);
            }
            setLoading(false);
        })
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        loadProduct(productId);
    },[])

    if (isLoading){
        return <ThreeDotsWave/>;
    }

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



    var filename = 'Others'
    if(product.cropName != "Others") {
        filename = product.cropName
    }

    return (
        <>
        <Topbar/>
        <div className="card-wrapper">
            <div className="card">
                <div className="img-container">
                    <img src={require(`../../assets/crops/${filename}.jpg`)} className="image-styling" />
                </div>

                <div className="content">
                    <h2 className="title">{product.title}</h2>

                    <div className="price">
                        <h3>₹ {product.price} (Per Kg.)</h3>
                    </div>
                    <div>
                        <h5>🌿: {product.cropName} - {product.cropSubType}</h5>
                    </div>

                    <div className="my-3">
                        <h3>Product Description </h3>
                        <h5>{product.description}</h5>
                    </div>

                    <div className="btn-group btn-group-lg" style={{width: '100%'}}>
                        <button type="button" onClick={s1} id="btn1" className="btn btn-primary segmentedButton active">Product Details</button>
                        <button type="button" onClick={s2} id="btn2" className="btn btn-primary segmentedButton">Land Details</button>
                        <button type="button" onClick={s3} id="btn3" className="btn btn-primary segmentedButton">Farmer Details</button>
                    </div>

                    <div id="section1" style={{display: 'block', marginTop:'1rem'}}>
                        <h4><b>Order Capacity</b>: {product.minimumOrderQuantity} - {product.maximumOrderQuantity} (Kg.)</h4>
                        <h4><b>Harvest Month</b>: {product.harvestMonth}</h4>
                        <h4><b>Delivery Month</b>: {product.deliveryMonth}</h4>
                        <h4><b>Payment before Harvest</b>: ₹ {product.paymentBeforeharvest}</h4>
                    </div>
                    <div id="section2" style={{display: 'none', marginTop:'1rem'}}>
                        <h4><b>Land Size (in acres)</b>: 10</h4>
                        <h4><b>Rainfall</b>: 10 mm</h4>
                        <h4><b>Address📍</b>: Jalgaon</h4>
                    </div>
                    <div id="section3" style={{display: 'none', marginTop:'1rem'}}>
                        <h4>🤵: {product.farmer.name}</h4>
                        <h4>📱: +91 {product.farmer.contact}</h4>
                        <h4>✉: {product.farmer.email}</h4>
                    </div>

                    {isAuth() && isAuth().user.role==1 && isAuth().user.verification=="Verified" &&(
                        <div className="d-flex justify-content-center">
                            <ChatNowButton userId={product.farmer._id} productId={product._id} productName={product.title} isProd="1"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )

}

export default Product;
