// Importing modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container,Row,Card, CardImg, CardBody,CardTitle, CardText } from "reactstrap";

import ThreeDotsWave from '../animation/ThreeDotsWave';

import Topbar from "../topbar/topbar";
import {useParams} from 'react-router-dom';
import {Line} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { requirePropFactory } from "@material-ui/core";
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

function CropCommodity() {

    const { commodityName } = useParams();

	const [pred, setpred] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [display,setDisplay] = useState(false);

    useEffect(() => {
        loadCommodityCost(commodityName);
    },[])

    const loadCommodityCost = commodityName => {
        const Upload = async() => {
            await fetch(`https://crop-cost-prediction.herokuapp.com/commodity/${commodityName}`, {
                method: 'GET'
                }).then(res => res.json())
                .then((data) => {
                    console.log(data["prediction"]);
                    setpred(data["prediction"]);
                    setLoading(false);
                    // setDisplay(true);
                })
                .catch(console.log)
            }
        Upload();
    };

    const mystyle = {
        width: "25px",
        height: "25px",
        display: 'inline'
    };

    if (isLoading){
        return <ThreeDotsWave />;
    }

    const thData =() =>{
        return (
            <tr>
            <th>Month</th>
            <th>Price(Per Qtl.)</th>
            <th>Change</th>
            </tr>
    )}

    const tdData =() =>{
        const icon_insert = (val) => {
            if (val >= 0){
                return require("./static/gain-icon.png")
            } else {
                return require("./static/loss-icon.png")
            }
        }
        return pred["forecast_values"].map(( listValue, index ) => {
            return (
              <tr key={index}>
                <td>{listValue[0]}</td>
                <td>Rs. {listValue[1]}</td>
                <td>{listValue[2]}%<img src={icon_insert(listValue[2])} style={mystyle} /></td>
              </tr>
            );
    })}

    return (

        
        <>

            <Topbar/>

            <h2 className="header ml-5">{pred["name"]}</h2>
            <div className="row">
                <div className="col s10" style={{maxWidth: "100%"}}>
                <div className="card horizontal medium grey lighten-3 ml-5 pb-5" style={{width: "900px",height: "450px"}}>
                    <div className="card-stacked">
                    <div className="card-content black-text pr-10" style={{paddingBottom: "24px"}}>
                        <table>
                        <tr>
                            <th>Basic Information</th>
                        </tr>
                        <tr>
                            <td>Current Price</td>
                            <td><b>Rs. {pred["current_price"]} / quintal</b></td>
                        </tr>
                        <tr>
                            <td>Prime Location</td>
                            <td><b>{pred["prime_loc"]}</b></td>
                        </tr>
                        <tr>
                            <td>Crop Type</td>
                            <td><b>{pred["type_c"]}</b></td>
                        </tr>
                        <tr>
                            <th>Brief Forecast</th>
                        </tr>
                        <tr>
                        <td><p>Min. crop price time</p></td>
                        <td><b>{pred["min_crop"][0]}</b></td>
                        <td><b>Rs. {pred["min_crop"][1]}</b></td>
                        </tr>
                        <tr>
                        <td><p>Max. crop price time</p></td>
                        <td><b>{pred["max_crop"][0]}</b></td>
                        <td><b>Rs. {pred["max_crop"][1]}</b><br></br></td>
                        </tr>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col s2 ml-5" style={{width: "100%"}}>
            <h4>Price Trend</h4><br></br>
            <Line

            data={{
                labels: pred["previous_x"],
                datasets: [
                    {
                        label:"Previous Year Price",
                        data: pred["previous_y"],
                        fill: false,
                        borderColor: "#4bc0c0",
                        lineTension: 0.1
                    }
                ]
            }}
            options={{
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        display : true
                    }
                }
            }}
            /><br></br>
            <Line

            data={{
                labels: pred["forecast_x"],
                datasets: [
                    {
                        label:"Next Year Price",
                        data: pred["forecast_y"],
                        fill: false,
                        borderColor: "#4bc0c0",
                        lineTension: 0.1
                    }
                ]
            }}
            options={{
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        display : true
                    }
                }
            }}
            />
            </div>
            </div>
            <div>
                <h4 className="ml-5">Forecast Trends</h4>
                <table className="striped ml-5">
                    <thead>
                    {thData()}
                    </thead>
                    <tbody>
                    {tdData()}
                    </tbody>
                </table>
            </div>
        </>
    );

}

export default CropCommodity;