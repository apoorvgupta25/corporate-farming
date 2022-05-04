import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import { Alert } from 'reactstrap';

import './add.css';
import {isAuth} from '../../auth/authAPICalls'
import {addProductToDB} from './farmerAPICalls'
import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';

const AddProduct = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        farmer: '',
        cropName: '',
        cropSubType: '',
        price: '',
        paymentBeforeharvest: '',
        minimumOrderQuantity:'',
        maximumOrderQuantity:'',
        harvestMonth:'',
        deliveryMonth:'',
        createdProduct:'',
        error: '',
        success: false,
        saving: false,
        createdId: ''
    });

    const {
        title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest,
        minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth,
        createdProduct, error, success, saving, createdId
    } = values;

    const [count, setCount] = useState(0);
    const {user, token} = isAuth();

    var crops = new Array('Banana', 'Brinjal', 'Cabbages', 'Cardamom', 'Cashew nuts', 'Cauliflowers', 'Chickpeas', 'Coconuts', 'Coffee', 'Coriander',
                            'Cotton', 'Fennel', 'Garlic', 'Ginger', 'Green peas', 'Groundnut', 'Guavas', 'Jowar', 'Lady Finger', 'Lemons', 'Mangoes',
                            'Onions', 'Potatoes', 'Rice', 'Sesame seeds', 'Sugarcane', 'Tea', 'Tomatoes', 'Turmeric', 'Wheat', 'Others');

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
        if(name=='title')
            setCount(event.target.value.length);
    }

    const successMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: createdProduct ? '' : 'none' }}
            >
                <h5><Link to={`/product/${createdId}`} className="text-primary">{createdProduct}</Link> Created Successfully</h5>
            </Alert>
        )
    }

    const errorMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="danger"
                style={{ display: error ? '' : 'none' }}
            >
                <h5>{error}</h5>
            </Alert>
        )
    }

  const onSubmit = event => {
      event.preventDefault()
      setValues({...values, error: false, saving: true})
      const prod = {title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity, maximumOrderQuantity, harvestMonth, deliveryMonth};
      addProductToDB(user._id, token, prod)
          .then(data => {
              if(data.error){
                  setValues({...values, error: data.error, saving: false});
              }
              else{
                  setValues({...values,
                      title: '',
                      description: '',
                      farmer: '',
                      cropName: '',
                      cropSubType: '',
                      price: '',
                      paymentBeforeharvest: '',
                      minimumOrderQuantity:'',
                      maximumOrderQuantity:'',
                      harvestMonth:'',
                      deliveryMonth:'',
                      saving: false,
                      createdProduct: data.title,
                      createdId: data._id
                  });
              }
          })
      }

      return (

        <>
        <Topbar/>
        <CircleModal saving={saving}/>

        <div className="add-main bg-cont-product">
            <div className="add-container mx-auto">
                {errorMessage()}

                <form method="POST" className="add-form">
                    <h2 className="add-heading" align="center">Add Fruits & Veggies</h2>

                    <label className="add-label">Title <p className="text-dark pull-right mb-0">{count}/11</p></label>
                    <input className="add-input" maxlength='11' type="text" name="title" onChange={handleChange("title")} value={title} placeholder="Title" required />
                    <label className="add-label">Description</label>
                    <input className="add-input" type="text" name="description" onChange={handleChange("description")} value={description} placeholder="Description" required />
                    <label className="add-label">Crop</label>
                    <select className="add-input" name="cropName" onChange={handleChange("cropName")} >
                        <option>-- Select --</option>
                        {crops.map((crop, index) => {
                            return ( <option value={crop} key={crop} >{crop}</option> )
                        })}
                    </select>
                    <label className="add-label">Crop - Subtype</label>
                    <input className="add-input" type="text" name="cropSubType" onChange={handleChange("cropSubType")} value={cropSubType} placeholder="Crop - Subtype" />
                    <label className="add-label">Price</label>
                    <input className="add-input" type="number" name="price" onChange={handleChange("price")} value={price} placeholder="Price (₹ per kg.)" min="1" required />
                    <label className="add-label">Payment before Harvest</label>
                    <input className="add-input" type="number" name="paymentBeforeharvest" onChange={handleChange("paymentBeforeharvest")} value={paymentBeforeharvest} placeholder="Payment before Harvest" min="1" required />
                    <label className="add-label">Minimum Production Capacity</label>
                    <input className="add-input" type="number" name="minimumOrderQuantity" onChange={handleChange("minimumOrderQuantity")} value={minimumOrderQuantity} placeholder="Minimum Production Capacity (kg.)" min="1" required />
                    <label className="add-label">Maximum Production Capacity</label>
                    <input className="add-input" type="number" name="maximumOrderQuantity" onChange={handleChange("maximumOrderQuantity")} value={maximumOrderQuantity} placeholder="Maximum Production Capacity (kg.)" min="1" required />
                    <div className="add-label">Harvest Month <input type="month" style={{marginLeft: '20px'}} name="harvestMonth" onChange={handleChange("harvestMonth")} value={harvestMonth}/></div>
                    <div className="add-label">Delivery Month<input type="month" style={{marginLeft: '20px'}} name="deliveryMonth" onChange={handleChange("deliveryMonth")} value={deliveryMonth}/></div>

                    <div className="form-button">
                        <input className="btn btn-primary w-100" type="submit" name="submit" onClick={onSubmit} value="Submit" />
                    </div>
                    {successMessage()}
                </form>
            </div>
        </div>
        </>

    )

}

export default AddProduct;
