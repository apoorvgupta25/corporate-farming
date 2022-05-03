import React, {useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';
import { addContractToDB } from './contractAPICall';
import '../../user/farmer/add.css'
import {isAuth} from '../../auth/authAPICalls'
import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';


const Contract = () => {
    const {productId, farmerId,isProd } = useParams();
    const [values, setValues] = useState({
        duration: '',
        document: '',
        createdContract: '', 
        error: '',
        success: false,
        saving: false,
        createdId: '',
    });

    const {
        duration, document, createdContract, error, success, saving, createdId
    } = values;

    const [count, setCount] = useState(0);
    const {user, token} = isAuth();


    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const successMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: createdContract ? '' : 'none' }}
            >
                <h5><Link to={`/product/${createdId}`} className="text-primary">{createdContract}</Link> Created Successfully</h5>
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
      const farmer = farmerId;
      const corporate = user._id;
      const product = productId;
      const contract = {farmer, corporate, isProd, duration, product, document};
      console.log(contract);
      addContractToDB(user._id, token, contract)
          .then(data => {
              if(data.error){
                  setValues({...values, error: data.error, saving: false});
              }
              else{
                  setValues({...values,
                      duration: '',
                      document: '',
                      saving: false,
                      createdContract: data.title,
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
                    <div className="form-group-1">
                        <p className="text-dark pull-right">{count}/11</p>
                        <input className="add-input-select" type="number" name="Duration" onChange={handleChange("duration")} value={duration} min="1" placeholder="Duration" required/>
                        <input className="add-input-select" type="text" name="Document" onChange={handleChange("document")} value={document} placeholder="Upload pdf"  required />
                        
                    </div>
                    <div className="form-submit" style={{marginTop: '10%', padding: '10px 30px'}}>
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
