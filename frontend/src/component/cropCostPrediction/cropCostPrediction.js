// Importing modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container,Row,Card, CardImg, CardBody,CardTitle, CardText } from "reactstrap";

import ThreeDotsWave from '../animation/ThreeDotsWave';

import Topbar from "../topbar/topbar";

import './CostPred.css'

function CropCostPrediction() {
	const [pred, setpred] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [display,setDisplay] = useState(false);

    useEffect(() => {
        setLoading(true);
        const Upload = async() => {
        await fetch('https://crop-cost-prediction.herokuapp.com/', {
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
    }, []);

    if (isLoading){
        return <ThreeDotsWave />;
    }

    const thData =() =>{
        return (
            <tr>
            <th>Item Name</th>
            <th>Price(Per Qtl.)</th>
            <th>Change</th>
            </tr>
    )}

    const tdDataGain =() =>{

        return pred["top5"].map(( listValue, index ) => {
            return (
              <tr key={index}>
                <td>{listValue[0]}</td>
                <td>Rs. {listValue[1]}</td>
                <td>{listValue[2]}%<img src={require("./static/gain-icon.png")} style={mystyle} /></td>
              </tr>
            );
        })}

    const tdDataLose =() =>{

        return pred["bottom5"].map(( listValue, index ) => {
            return (
                <tr key={index}>
                <td>{listValue[0]}</td>
                <td>Rs. {listValue[1]}</td>
                <td>{listValue[2]}%<img src={require("./static/loss-icon.png")} style={mystyle} /></td>
                </tr>
            );
        })}

    const mystyle = {
        width: "25px",
        height: "25px",
        display: 'inline'
    };

    const formStyle = {
        color: "black",
        borderRadius: "25px",
        padding: "10px 10px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

	return (
		<div className="App">

            <Topbar/>
            <h5 className="ml-2">Explore by commodity</h5>
            
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/paddy"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/rice-bowl.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Paddy</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/wheat"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/wheat.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Wheat</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/barley"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/barley.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Barley</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/soyabean"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/soy.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Soya Bean</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/cotton"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/cotton.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Cotton</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/copra"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/coconut.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Coconut</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/groundnut"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/peanuts.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Ground Nut Seeds</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/rape"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Mustard Seeds</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/sesamum"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/sesame.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Gingelly Seed(Sesamum)</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/gram"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Gram</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/sugarcane"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/bamboo.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Sugarcane</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/arhar"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Arhar</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/ragi"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/office/48/000000/wheat.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Ragi</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/maize"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/corn.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Maize</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/moong"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Moong</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/masoor"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Masoor</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/urad"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Urad</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/jute"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/potato.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Raw Jute</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/niger"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Niger Seed</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/safflower"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Kardi Seed</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    <Link to={"/commodity/sunflower"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Sonnenblume_02_KMJ.jpg/640px-Sonnenblume_02_KMJ.jpg" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Sunflower</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/jowar"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://cdn.shopify.com/s/files/1/0104/1059/0266/products/Organic_Sorghum_Jowar_1_large_f525aeff-2b90-43d8-b56b-9adb6e7c9757.jpg?v=1581490414" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Jowar</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
                <div className="col s3">
                    <Link to={"/commodity/bajra"} style={{textDecoration: "none"}}>
                    <Card style={{width: '25rem', height: '10rem',position: 'relative'}}>
                        <CardImg style={{width: '100%',height:'9rem'}} src="https://previews.123rf.com/images/rickysoni/rickysoni1805/rickysoni180500220/102326144-pearl-millet-seeds-also-know-as-bajra-bajri-bulrush-millet-or-indian-millet-isolated-on-white-backgr.jpg" alt="Card image cap" />
                        <CardBody>
                        <CardTitle style={{marginTop: '25%'}}>Bajra</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            </div>

		</div>
	);
}

export default CropCostPrediction;
