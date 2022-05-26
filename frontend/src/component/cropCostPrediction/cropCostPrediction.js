// Importing modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle} from "reactstrap";
import './CostPred.css'

import ThreeDotsWave from '../animation/ThreeDotsWave';

import Topbar from "../topbar/topbar";

function CropCostPrediction() {
    const [isLoading, setLoading] = useState(true);
    // const [display,setDisplay] = useState(false);

    useEffect(() => {
        setLoading(true);
        const Upload = async() => {
        await fetch('https://crop-cost-prediction.herokuapp.com/', {
            method: 'GET'
            }).then(res => res.json())
            .then((data) => {
                setLoading(false);
                // setDisplay(true);
            })
            .catch(console.log)
        }
        Upload();
    }, []);

    if (isLoading){
        return <ThreeDotsWave />;
    }

	return (
		<div className="App">

            <Topbar/>
			<h2 className="text-center font-weight-bold mt-3 mb-4">Explore by commodity</h2>
			<div className="row w-100 ml-1">
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="paddy" title="Paddy" img="rice-bowl" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="wheat" title="Wheat" img="wheat" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="barley" title="Barley" img="barley" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="soyabean" title="Soya Bean" img="soy" />
				</div>
			</div>
			<div className="row w-100 ml-1">
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="cotton" title="Cotton" img="cotton" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="copra" title="Coconut" img="coconut" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="groundnut" title="Ground Nut Seeds" img="peanuts" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="rape" title="Mustard Seeds" img="seeds" />
				</div>
			</div>
			<div className="row w-100 ml-1">
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="sesamum" title="Gingelly Seed(Sesamum)" img="sesame" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="gram" title="Gram" img="lentils" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="sugarcane" title="Sugarcane" img="bamboo" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="arhar" title="Arhar" img="lentils" />
				</div>
			</div>
			<div className="row w-100 ml-1">
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="ragi" title="Ragi" img="ragi" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="maize" title="Maize" img="maize" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="moong" title="Moong" img="lentils" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="masoor" title="Masoor" img="lentils" />
				</div>
			</div>
			<div className="row w-100 ml-1">
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="urad" title="Urad" img="lentils" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="jute" title="Raw Jute" img="jute" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="niger" title="Niger Seed" img="seeds" />
				</div>
				<div className="col-3 d-flex justify-content-center">
					<Commodity link="safflower" title="Kardi Seed" img="seeds" />
				</div>
			</div>
			<div className="row w-100 ml-1">
				<div className="col-4 d-flex justify-content-center">
					<Commodity link="sunflower" title="Sunflower" img="sunflower" />
				</div>
				<div className="col-4 d-flex justify-content-center">
					<Commodity link="jowar" title="Jowar" img="jowar" />
				</div>
				<div className="col-4 d-flex justify-content-center">
					<Commodity link="bajra" title="Bajra" img="bajra" />
				</div>
			</div>
		</div>
	);
}

const Commodity = ({
    link = "",
    title = "",
    img = ""
}) => {
    return (
		<Link to={`/commodity/${link}`} style={{textDecoration: "none"}}>
			<Card className="card-style">
				<CardImg src={require(`../../assets/cost/${img}.png`)} alt="Card image cap" />
				<CardBody className="d-flex align-items-center font-weight-bold">
				<CardTitle>{title}</CardTitle>
				</CardBody>
			</Card>
		</Link>
    );
}


export default CropCostPrediction;
