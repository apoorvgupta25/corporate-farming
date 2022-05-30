import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Person, Update, Delete } from "@material-ui/icons";

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
            <Link className="btn btn-primary ml-5 mt-3" to={`/farmer/dashboard/${user._id}`}> <Person/> Dashboard</Link>
            <h1 className="text-center mb-5">Manage Product</h1>
            <div className="text-dark table-responsive pl-5 pr-5">
                <table className="table">
                    <thead>
                        <tr>
                          <th className="align-top"><b>Image</b></th>
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
                            var filename = 'Others'
                            if(prod.cropName !== "Others") filename = prod.cropName
                            return (
                                <tr key={index}>
                                  <td><img className="item-image mr-2 mb-0" src={require(`../../assets/crops/${filename}.jpg`)} alt="Product" /></td>
                                  <td><Link to={`/product/${prod._id}`} target="_blank">{prod.title}</Link></td>
                                  <td>{prod.cropName}</td>
                                  <td>₹ {prod.price}</td>
                                  <td>₹ {prod.paymentBeforeharvest}</td>
                                  <td>{prod.minimumOrderQuantity} - {prod.maximumOrderQuantity}</td>
                                  <td>{prod.deliveryMonth} / {prod.harvestMonth}</td>
                                  <td className="p-3">
                                      <Link className="btn btn-success" to={`/farmer/product/update/${prod._id}`}>
                                          <div className="text-white"><Update/>Update</div>
                                      </Link>
                                  </td>
                                  <td>
                                      <button onClick={() => {deleteThisProduct(prod._id)}} className="btn btn-danger"><Delete/></button>
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
