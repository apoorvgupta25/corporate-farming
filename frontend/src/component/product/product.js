import React, {useState, useEffect}  from "react";

import {getProduct} from './productAPICall'
import {useParams} from 'react-router-dom';
import {API} from '../../backend';

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

    return (
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
                        <button type="button" data-section="section1" className="btn btn-primary segmentedButton active">Product Details</button>
                        <button type="button" data-section="section2" className="btn btn-primary segmentedButton">Land Details</button>
                        <button type="button" data-section="section3" className="btn btn-primary segmentedButton">Farmer Details</button>
                    </div>

                    <div className="content-section" id="section1" style={{display: 'block'}}>
                        <h4>Order Capacity: {product.minimumOrderQuantity} - {product.maximumOrderQuantity}</h4>
                        <h4>Harvest Month: {product.harvestMonth}</h4>
                        <h4>Delivery Month: {product.deliveryMonth}</h4>
                        <h4>Payment before Harvest: ₹ {product.paymentBeforeharvest}</h4>
                    </div>
                    <div className="content-section" id="section2">
                        <h4>Land Size (in acres): 10</h4>
                        <h4>Rainfall: 10 mm</h4>
                        <h4>📍: Jalgaon</h4>
                    </div>
                    <div className="content-section" id="section3">
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
    )

}

export default Product;
