import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Person, Update, Delete } from "@material-ui/icons";

import {API} from '../../backend';
import {isAuth} from '../../auth/authAPICalls';
import {deleteLand} from './farmerAPICalls';
import {getAllLands} from '../../component/land/landAPICall';

import ThreeDotsWave from '../../component/animation/ThreeDotsWave';
import Topbar from "../../component/topbar/topbar";

const ManageLand = () => {

    const [lands, setLand] = useState([])
    const [loading, setLoading] = useState(true)

    const {user, token} = isAuth();

    const preload = () => {
        getAllLands()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setLand(data)
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisLand = landId => {
        setLoading(true);
        deleteLand(landId, user._id, token)
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
            <h1 className="text-center mb-5">Manage Land</h1>
            <div className="text-dark table-responsive pl-5 pr-5">
                <table className="table">
                    <thead>
                        <tr>
                          <th><b>Image</b></th>
                          <th><b>Land Name</b></th>
                          <th><b>Bond Time</b></th>
                          <th><b>Location</b></th>
                          <th><b>Expected Profit</b></th>
                          <th><b>Update</b></th>
                          <th><b>Delete</b></th>
                        </tr>
                    </thead>
                    <tbody >
                        {lands
                            .filter(land => land.farmer._id === user._id)
                            .map((land, index) => {
                            return (
                                <tr key={index}>
                                  <td><img src={`${API}/land/photo/${land._id}`} alt="" style={{height:'125px', width:'auto', paddingBottom: '1rem'}} /></td>
                                  <td><Link to={`/land/${land._id}`} target="_blank">{land.title}</Link></td>
                                  <td>{land.bondTime} months</td>
                                  <td>{land.landProperties.city}, {land.landProperties.state}</td>
                                  <td>₹ {land.expectedProfit.exactAmount} ({land.expectedProfit.percentage}%)</td>
                                  <td className="p-3">
                                      <Link className="btn btn-success" to={`/farmer/land/update/${land._id}`}>
                                          <div className="text-white"><Update/> Update</div>
                                      </Link>
                                  </td>
                                  <td>
                                      <button onClick={() => {deleteThisLand(land._id)}} className="btn btn-danger"><Delete/></button>
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



export default ManageLand;
