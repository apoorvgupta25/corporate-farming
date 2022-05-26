import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {API} from '../../backend';
import { Person, Link as LinkIcon } from "@material-ui/icons";

import '../../component/home/home.css';
import {isAuth} from '../../auth/authAPICalls';
import {getAllContracts} from '../../component/contract/contractAPICall';
import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

const ManageContract = () => {

    const [contracts, setContract] = useState([])
    const [loading, setLoading] = useState(true)

    const showNoLand = false;

    const [filterType, setFilterType] = useState('proposed');

    const NoLandDisplay = () => <div className="not-found">
        <b>Sorry! <br/> No Lands Available</b>
    </div>;

    var statuses = ["rejected", "accepted"];

    const {user} = isAuth();

    const getId = (corporate, farmer) =>{
        if(user.role === 1){
            return corporate;
        }
        if(user.role === 0){
            return farmer;
        }
        return null;
    }

    const getlink = (productId, isProd) => {
        let link = "";
        if(isProd === 0){
          link  = "/land/"+productId;
        }else{
          link = "/product/"+productId;
        }

        return link;
    }

    useEffect(() => {
        getAllContracts()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                var filteredArray = data;
                    filteredArray = data.filter(function (el)
                    {
                        return el.status === filterType;
                    }
                    );
                var sorted = [];
                sorted = [...filteredArray]
                setContract(sorted)
                setLoading(false);

            }

        })
    }, [filterType,showNoLand]);



    if (loading){
        return <ThreeDotsWave/>;
    }

    return (
        <div>
            <Topbar/>
            <Link className="btn btn-primary ml-5 mt-3" to={`/corporate/dashboard/${user._id}`}> <Person/> Dashboard</Link>
            <h1 className="text-center mb-5">Manage Contracts</h1>
            <div className="filter-sort">
                <b className="h4">Filter By Status:&nbsp;</b>
                <select onChange={(e) => setFilterType(e.target.value)}>
                    <option value="proposed">proposed</option>
                    {statuses.map(status => {
                        return <option value={status}>{status}</option>;
                    })}
                </select>&nbsp;&nbsp;
            </div><br></br>
        {showNoLand ? <NoLandDisplay /> : null}

        {contracts.length===0 && (
            <div className="text-center h1 font-weight-bold">
                No Contracts
            </div>
        )}
        {contracts.length >0 && (
            <div className="text-dark table-responsive pl-5 pr-5">
                <table className="table">
                    <thead>
                        <tr>
                          <th><b>Duration (months)</b></th>
                          <th><b>Document</b></th>
                          <th><b>Status</b></th>
                          <th><b>Contract</b></th>
                          <th><b>Product/Land</b></th>
                        </tr>
                    </thead>
                    <tbody >
                        {contracts
                            .filter(contract => getId(contract.corporate,contract.farmer)  === user._id)
                            .map((contract, index) => {
                            return (
                                <tr key={index}>

                                  <td>{contract.duration}</td>
                                  <td><a href={`${API}/contract/pdf/${contract._id}`} target="_blank" rel="noreferrer" className="text-primary">Contract</a> </td>
                                  <td>{contract.status}</td>

                                  <td className="p-3">
                                      <Link target="_blank" className="btn btn-success" to={`/contract/view/${contract._id}`}>
                                          <div className="text-white">View Contract</div>
                                      </Link>
                                  </td>
                                  <td>
                                  <Link target="_blank" className="btn btn-success" to={getlink(contract.product,contract.isProd)}>
                                          <div className="text-white">View<LinkIcon className="ml-2"/> </div>
                                      </Link>
                                  </td>
                                </tr>
                             )
                         })}
                    </tbody>
                </table>
            </div>
        )}


        </div>
    )

}

export default ManageContract;
