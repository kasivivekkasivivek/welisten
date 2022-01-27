
import { Component } from "react";
import "./loginPageStyling.css"

// react bootstartp components 
import {Button,Form,InputGroup,Row} from "react-bootstrap"

import SignUpLoginHeader from "../SignUpLoginHeader";

import InfoContainer from "../InfoContainer";

// Toast import content 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// to use cookies import js-cookie
import Cookies from 'js-cookie';


// import firebase 
import {db} from "../FirbaseDb"
import {collection,getDocs,addDoc} from "firebase/firestore";
import {auth} from "../FirbaseDb"

// fire base authentication 
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import NavBarPage from "../NavBarPage";
import UserNameComponent from "../UserNameComponent";


class LoginPage extends Component{

    state={
            showPassword:false,
            userEmailAddress:"",
            userPassword:"",
    }

    onClickSignUpText = ()=>{
      const {history} = this.props 
      history.replace("/signup")
    }

    handleSubmit = async (event)=>{
        event.preventDefault();
        const {userEmailAddress,userPassword} = this.state
        this.userLoginAuth(userEmailAddress,userPassword)
        /*
        const response = await fetch('http://localhost:3001/loginUser/',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "EmailAddress":`${userEmailAddress}`,
                "UserPassword":`${userPassword}`
            })
        })
        const data = await response.json()
        console.log(response)
        // get the JWT token 
        console.log(data)

        if(response.ok===true){
          toast.success(`Welcome to WeListen`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });


            setTimeout(()=>{
              this.onSubmitSuccess(data.jwtToken)
            },3000)
        }*/
    }

    userLoginAuth = async (userEmailAddress,userPassword)=>{
        try{
          const loginUser = await signInWithEmailAndPassword(auth,userEmailAddress,userPassword);
          //console.log(loginUser.user.uid)
          //console.log(loginUser.user.accessToken)
          toast.success(`Welcome to WeListen`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            setTimeout(()=>{
              this.onSubmitSuccess(loginUser.user.accessToken,loginUser.user.uid)
            },3000)
        }
        catch(error){
          console.log(error.message)
        }
    }

    onSubmitSuccess = (jwtToken,userEmail)=>{
      const {history} = this.props;
      history.replace("/");
      Cookies.set('jwt_token',jwtToken,{expires:10})  // JWT token will delete from the cookies after 10 days 
      Cookies.set('user_email',userEmail,{expires:10})  
    }

    onClickChangeEyeIcon  = ()=>{
        this.setState(prevState=>({showPassword:!prevState.showPassword}))
    }


    // on change email address in login page 
    onChangeEmailAddressLogin = (event)=>{
      const inputEmailAddress = event.target.value;
      this.setState({userEmailAddress:inputEmailAddress.toLowerCase()})
    }

    onChangePasswordLogin = (event)=>{
      const inputPassword = event.target.value;
      this.setState({userPassword:inputPassword})
    }


    render(){


        const atTheRateIcon = "https://img.icons8.com/fluency/48/000000/email.png";
        
        const {showPassword} = this.state
        const PasswordEye = showPassword ? "https://img.icons8.com/emoji/48/000000/eye-emoji.png" 
        : "https://img.icons8.com/office/16/000000/closed-eye.png";

        // get user email address
        const {userEmailAddress} = this.state

        // get user password 
        const {userPassword} = this.state

        const userLoginDetails = {userEmailAddress,userPassword}
        //console.log(userLoginDetails)


        return(
            <div className="login_page_main_container">
          <div className="signup_page_header_container">
            <SignUpLoginHeader/>
          </div>
          {/**Signup form container has regsyy=ter now heading container and form_info container */}
          <div className="signup_form_container">
            {/**Register Now heading Container */}
            <div className="signup_heading_container">
              <h1 className="registernow_heading">Welcome to We Listen</h1>
            </div>

            {/**form_info container has we listen info and sign up form  */}
            <div className="form_info_container">
              <InfoContainer/>
           
           <Form className="form_container" onSubmit={this.handleSubmit}>
            <Row>
            <div className="face_image_container">
                <img className="face_image" src="https://cdn4.iconfinder.com/data/icons/peppyicons-rounded/512/user1-512.png"/>
            </div>
               
              {/**Email Address */}
              <Form.Group md="4" controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <img className="atTheRateIcon" src={atTheRateIcon} alt="email_icon"/>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={this.onChangeEmailAddressLogin}
                  />
                  
                </InputGroup>
              </Form.Group>
                
               
              {/* Password */}
              <Form.Group md="4" controlId="validationCustomPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend" onClick={this.onClickChangeEyeIcon}>
                  <img className="eye_image" src={PasswordEye} alt="open_closed_eye_icon"/>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={this.onChangePasswordLogin}
                  />
                </InputGroup>
              </Form.Group>


              

             
            </Row>

            
              <Form.Group className="mb-3 mt-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button type="submit">Login</Button>
              <ToastContainer/>
              <p className="signup_text">Dont't Have a account ? <span onClick={this.onClickSignUpText}
              className="signup_text_span">SignUp</span></p>
            </Form>
              </div>
            </div>
            </div>
        )
    }
}

export default LoginPage