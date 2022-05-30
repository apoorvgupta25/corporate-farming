import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';

import {isAuth} from '../../auth/authAPICalls'
import { addContractToDB } from './contractAPICall';

import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';

import '../../user/farmer/add.css'

const Contract = () => {
    const {productId, farmerId, isProd} = useParams();
    const [values, setValues] = useState({
        duration: '',
        contract_document: '',
        error: '',
        saving: false,
        createdId: '',
        formData: new FormData()
    });

    const { duration, error,saving, createdId, formData } = values;

    const {user, token} = isAuth();

    const handleChange = name => event => {
        let value = event.target.value;
        if(name === "contract_document")
            value = event.target.files[0]

        formData.set(name, value);

        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: createdId ? '' : 'none' }}
            >
                <h5><Link to={`/contract/view/${createdId}`} className="text-primary">Contract </Link>Created Successfully</h5>
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

      formData.set("farmer", farmerId)
      formData.set("corporate", user._id)
      formData.set("product", productId)
      formData.set("isProd", isProd)

      addContractToDB(user._id, token, formData)
          .then(data => {
              if(data.error){
                  setValues({...values, error: data.error, saving: false});
              }
              else{
                  setValues({...values,
                      duration: '',
                      contract_document: '',
                      saving: false,
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
                    <h2 className="add-heading" align="center">New Contract</h2>

                    <label className="add-label">Duration (in months)</label>
                    <input className="add-input" type="number" name="Duration" onChange={handleChange("duration")} value={duration} min="1" placeholder="Duration" required/>
                    <label className="add-label">Upload Contract PDF</label>
                    <input className="add-input" type="file" name="contract_document" onChange={handleChange("contract_document")} placeholder="Upload pdf"  accept="application/pdf" required />

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

export default Contract;
