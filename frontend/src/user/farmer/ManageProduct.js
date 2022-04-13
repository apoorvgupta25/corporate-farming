import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {API} from '../../backend';

import {isAuth} from '../../auth/authAPICalls';
import {deleteProduct} from './farmerAPICalls';
import {getAllProducts} from '../../component/product/productAPICall';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

const ManageProduct = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {user, token} = isAuth();

    const preload = () => {
        getAllProducts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data)
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisProduct = productId => {
        setLoading(true);
        deleteProduct(productId, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
            setLoading(false);
        });
    };

    if (loading){
        return <ThreeDotsWave/>;
    }

    return (
        <div>
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Manage Product</h1>
            <div className="text-dark table-responsive pl-5 pr-5">
                <table className="table">
                    <thead>
                        <tr>
                          <th className="align-top"><b>Title</b></th>
                          <th className="align-top"><b>Crop</b></th>
                          <th className="align-top"><b>Price</b></th>
                          <th className="align-top"><b>Payment <br/>(before Harvest)</b></th>
                          <th className="align-top"><b>Quantity</b></th>
                          <th className="align-top"><b>Deliery / Harvest Month</b></th>
                          <th className="align-top"><b>Update</b></th>
                          <th className="align-top"><b>Delete</b></th>
                        </tr>
                    </thead>
                    <tbody >
                        {products
                            .filter(prod => prod.farmer._id === user._id)
                            .map((prod, index) => {
                            return (
                                <tr key={index}>
                                  <td>{prod.title}</td>
                                  <td>{prod.cropName}</td>
                                  <td>₹ {prod.price}</td>
                                  <td>₹ {prod.paymentBeforeharvest}</td>
                                  <td>{prod.minimumOrderQuantity} - {prod.maximumOrderQuantity}</td>
                                  <td>{prod.deliveryMonth} / {prod.harvestMonth}</td>
                                  <td className="p-3">
                                      <Link className="btn btn-success" to={`/farmer/product/update/${prod._id}`}>
                                          <div className="">Update</div>
                                      </Link>
                                  </td>
                                  <td>
                                      <button onClick={() => {deleteThisProduct(prod._id)}} className="btn btn-danger">Delete</button>
                                  </td>
                                </tr>
                             )
                         })}
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default ManageProduct;
