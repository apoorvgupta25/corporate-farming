import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';

import {isAuth} from '../../auth/authAPICalls';
import { getContract,updateContractInDB } from './contractAPICall';

import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';

import '../../user/farmer/add.css';

const StatusChangeContract = () => {
    const {contractId, newstatus} = useParams();
    const [values, setValues] = useState({
        status: '',
        reason: '',
        error: '',
        saving: false,
        createdId: '',
        formData: new FormData()
    });

    const {
        reason, error, saving, createdId, formData
    } = values;

    const {user, token} = isAuth();

    const preload = (contractId) => {
        getContract(contractId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values,
                    status: newstatus,
                    reason: data.reason,
                    saving:false,
                });
            }
        })
        .catch()
    };

    useEffect(() => {
        preload(contractId);
        // eslint-disable-next-line
    }, [])
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
        formData.set(name, event.target.value);

    }

    const successMessage = () => {
        return (
            <Alert
                className="pb-0 text-center"
                color="success"
                style={{ display: createdId ? '' : 'none' }}
            >
                <h5><Link to={`/contract/view/${createdId}`} className="text-primary">Contract </Link>Updated Successfully</h5>
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

        formData.set('status', newstatus);
        formData.set('reason', reason);

        updateContractInDB(contractId, user._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, saving: false});
                }
                else{
                    setValues({...values,
                        status: '',
                        createdId: data._id,
                        saving: false,
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
                    <h2 className="add-heading" align="center">{newstatus} Contract</h2>
                    <label className="add-label">Reason</label>
                    <input className="add-input" type="text" name="reason" onChange={handleChange("reason")} value={reason} placeholder="Reason" required />
                    <label className="add-label">Status</label>
                    <input className="add-input" type="text" name="status" onChange={handleChange("status")} value={newstatus} placeholder="Status" required />

                    <div className="form-button">
                        <input className="btn btn-primary w-100" type="submit" name="submit" onClick={onSubmit} value="Update" />
                    </div>
                    {successMessage()}
                </form>
            </div>
        </div>
        </>

    )

}

export default StatusChangeContract;
