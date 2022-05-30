import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import Cookies from 'universal-cookie';
import OtpInput from "react-otp-input";
import emailjs from '@emailjs/browser';

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import Topbar from '../component/topbar/topbar';
import ThreeDotsWave from '../component/animation/ThreeDotsWave';

import './signin_signup.css';

const useStyles = makeStyles(theme => ({
    grid: {
      backgroundColor: "grey",
      height: "50vh",
      textAlign: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }));

  function generateOTP() {

    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
    }

const otpVal = generateOTP();

function VerifyOtp() {

    const cookies = new Cookies();

    const navigate = useNavigate();

    const {userId} = useParams();

    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    const [code, setCode] = useState("");

    const handleChange = (code) => {
      setCode(code);
      console.log("code1",code);
      console.log("otp",otpVal);
      if (code.length === 6){
        if (code.toString() === otpVal) {
          console.log("success");
          cookies.set("OTPVerified",false,{path:'/'});
          <Route exact path="/" render={() => (
            <Redirect to={`/admin/dashboard/${userId}`}/>
          )}/>
        } else {
          console.log(otpVal);
          console.log("error");
        }
      }
    }

    useEffect(() => {
        setLoading(false);
        // otpVal = "123456";
        console.log(otpVal);

        const templateParams = {
            otpValue: otpVal
        };

        console.log("code",code);

        // emailjs.send("service_tgch8f4","template_wd0oikp",templateParams,"ZptV933n0cnt-maYF").then(res=>{
        //     console.log(res);
        //     setLoading(false);
        // }).catch(err => console.log(err));
        
        // eslint-disable-next-line
    }, []);

    const checkOtp = () => {
      console.log("code",code);
      if (code.toString() === otpVal) {
        // console.log("success");
        // <Navigate to={`/admin/dashboard/${userId}`}  />
        if (code.toString() === otpVal) {
          cookies.set("OTPVerified",true,{path:'/'});
          console.log("success");
          // <Navigate to={`/admin/dashboard/${userId}`}  />
          navigate(`/admin/dashboard/${userId}`);
        } else {
          cookies.set("OTPVerified",false,{path:'/'});
          console.log(otpVal);
          console.log("error");
        }
      } else {
        cookies.set("OTPVerified",false,{path:'/'});
        console.log("error");
      }
    }

  if (isLoading){
    return <ThreeDotsWave />;
    }

  return (


    <div className="container-sign text-center">
        <Topbar/>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={3}
          style={{marginTop: "3%"}}
        >
          <Grid item container justify="center">
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <div component="h1" className="h2 text-light font-weight-bold">
                  Verification Code
                </div>
              </Grid>
            </Grid>
          </Grid>
          <CssBaseline />
          <Grid item xs={12} textAlign="center">
              <div className="h3 text-light">
                Please enter the verification code sent on your email address
              </div>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item spacing={3} justify="center">
            <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={6}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue"
            }}
            focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none"
            }}
        />
            <Grid item xs={12} textAlign="center">
              <Typography variant="p" className="text-blue-600">
                <a onClick={() => window.location.reload()} style={{color: '#1e88e5'}}>Resend OTP</a>
              </Typography>
            </Grid>
            </Grid>
            <Grid item style={{marginTop: "2%"}}>
              <form onSubmit={checkOtp}>
                <Button type="submit" className="otp-btn" onSubmit={checkOtp}>Verify</Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        </Container>
        </div>
  );
}

export default VerifyOtp;
