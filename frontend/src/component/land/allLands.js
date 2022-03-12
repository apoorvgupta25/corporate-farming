import React, {useState, useEffect}  from "react";

import {getAllLands} from './landAPICall'

import Navbar from '../Navbar';
import {Card} from '../home/home'

import '../home/home.css';

const AllLands = () => {

    const [lands, setLands] = useState([]);

    const getLandData = () => {
        getAllLands()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLands(data);
            }
        })
    };

    useEffect(() => {
        getLandData()
    },[])


    return (
        <>
        <Navbar/>
        <h2 className="text-center font-weight-bold">Land for Lease</h2>
        <div className="wrapper">
            {lands.map((land, index) => {
                return (
                    <div key={index}>
                        <Card land={land}/>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default AllLands;
