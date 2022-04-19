// Importing modules
import React, { useState, useEffect } from "react";
import { Container,Row,Card } from "reactstrap";

import BouncingBall from '../animation/BouncingBall';

import Topbar from "../topbar/topbar";

function CropDiseasePrediction() {
	const [pred, setpred] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [display,setDisplay] = useState(false);


    const mystyle = {
        width: "40%",
        marginTop: "5%",
        marginBottom: "5%"
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

    const preview_image = (event) => {
      var reader = new FileReader();
      reader.onload = function () {
        var output = document.getElementById('output-image')
        output.src = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        setDisplay(false);
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const Upload = async() => {
        await fetch('https://crop-disease-predict.herokuapp.com/', {
            method: 'POST',
            body: formData
          }).then(res => res.json())
          .then((data) => {
                console.log(data["prediction"]);
                setpred(data["prediction"]);
                setLoading(false);
                setDisplay(true);
          })
          .catch(console.log)
        }
        Upload();
    }

	return (
		<div className="App">

            <Topbar/>
            <br />
            <h2 style={{textAlign: "center", margin: "0px",color: "black"}}>
                <b>Find out which disease has been caught by your plant</b>
            </h2>
            <br />
            
            <div style={formStyle}>
                <form onSubmit={handleSubmit} className="form-signin" encType="multipart/form-data">
                    <h2 className="h4 mb-3 font-weight-normal"><b>Please Upload The Image</b></h2>
                    <input type="file" id="image" name="file" accept="image/*" className="file-custom" onChange={preview_image} />
                    <img id="output-image" className="rounded mx-auto d-block" style={mystyle}/>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">Predict</button>
                </form>
            </div><br></br>

            {isLoading ? <BouncingBall /> : null}

            {display ? <Container>
                <Row>
                    <Card style={{display: "flex", backgroundColor:"#afe1ed", paddingTop:"1%",paddingBottom:"1%",marginBottom:"5%"}}>
                        <div dangerouslySetInnerHTML={{__html: pred}} style={{color: "black", fontSize: "22px",display: "flex",textAlign: "center"}}></div>
                    </Card>
                </Row>
            </Container> :null}

		</div>
	);
}

export default CropDiseasePrediction;
