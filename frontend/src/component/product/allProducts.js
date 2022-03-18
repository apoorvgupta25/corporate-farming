import React, {useState, useEffect}  from "react";

import {getAllProducts} from './productAPICall';

import {List} from '../home/home'
import Navbar from '../Navbar';
import Topbar from "../topbar/topbar";
import '../home/home.scss';

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    const getProductData = () => {
        getAllProducts()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    };

    useEffect(() => {
        getProductData()
    },[])


    return (
        <>
         <Topbar/>
        <h2 className="text-center font-weight-bold">Products</h2>
        <div className="list-container">
            {products.map((prod, index) => {
                return (
                    <div key={index}>
                        <List prod={prod}/>
                    </div>
                )
            })}
        </div>
        </>

    )
}

export default AllProducts;
