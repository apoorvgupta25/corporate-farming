import React, {useState, useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import { Alert } from 'reactstrap';
import { getContract,updateContractInDB } from './contractAPICall';
import '../../user/farmer/add.css'
import {isAuth} from '../../auth/authAPICalls'
import Topbar from "../../component/topbar/topbar";
import CircleModal from '../../component/animation/CircleModal';


const StatusChangeContract = () => {
    const {contractId, newstatus} = useParams();
    const [loading, setLoading] = useState('false');
    const [values, setValues] = useState({
        duration: '',
        farmer: '',
        corporate: '',
        document: '',
        createdContract: '',
        product: '',
        status: '',
        isProd: '',
        reason: '',
        error: '',
        success: false,
        saving: false,
        createdId: '',
    });

    const {
        duration, farmer,reason, corporate, document, product, status, isProd, createdContract, error, success, saving, createdId
    } = values;

    const [count, setCount] = useState(0);
    const {user, token} = isAuth();

    const preload = (contractId) => {
        getContract(contractId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values,
                    farmer: data.farmer,
                    corporate: data.corporate,
                    product: data.product,
                    duration: data.duration,
                    document: data.document,
                    status: newstatus,
                    isProd: data.isProd,
                    reason: data.reason,
                    saving:false,
                });
            }
            setLoading(false);
        })
        .catch()
    };

    useEffect(() => {
        preload(contractId);
    }, [])
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
        const cont = {farmer, corporate, product, duration, document, status, reason,isProd};

        updateContractInDB(contractId, user._id, token, cont)
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, saving: false});
                }
                else{
                    setValues({...values,
                        farmer: '',
                        corporate: '',
                        product: '',
                        duration: '',
                        document: '',
                        status: '',
                        isProd: '',
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
