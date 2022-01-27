
import {Button,Form,InputGroup,Row} from "react-bootstrap"
import SignUpLoginHeader from "../SignUpLoginHeader"
import {Component} from "react"
import "./SignUpStyles.css"
import InfoContainer from "../InfoContainer"
// Toast import content 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import firebase 
import {db} from "../FirbaseDb"
import {collection,getDocs,addDoc} from "firebase/firestore";
import {auth} from "../FirbaseDb"

// fire base authentication 
import {createUserWithEmailAndPassword} from "firebase/auth"

class SignUpPage extends Component{

    state={
      
      showPassword:false,
      showConfirmPassword:false,
      NickNames:["Landon","Sawyer","Tariah","Jasper","Milania","Matilde","Jamar","Makayla","Wilson","Abigael","Jenifer","Valery",
        "Rio","Moksh","Rainy"],
        //first name state values 
      validateFirstName:true,
      userFirstName:"",

      // last name state values 
      validateLastName:true,
      userLastName:'',

      // email address state values 
      userEmailAddress:"",
      validateEmailAddress:true,

      //phone number state values 
      userPhoneNumber:"",
      validatePhoneNumber:true,

      // password state value 
      userPassword:"",
      validatePassword:true,
      passwordErrorMessage:'',

      // confirm password 
      userConfirmPassword:"",
      validateConfirmPassword:true,

    }
  

  handleSubmit = async (event) => {
    event.preventDefault();
    // get validate first name 
    const {userFirstName,validateFirstName} = this.state

    //get validate last name 
    const {userLastName,validateLastName} = this.state 
    // validate email address
    const {userEmailAddress,validateEmailAddress} = this.state;
    this.validateEmailAddress(userEmailAddress)
    //validate mobile number 
    const {userPhoneNumber,validatePhoneNumber} = this.state
    this.validatePhoneNumber(userPhoneNumber)

    // validate password 
    const {userPassword,validatePassword} = this.state
    this.validatePassword(userPassword)

    // validate confirm password 
    const {userConfirmPassword,validateConfirmPassword} = this.state
    this.validateConfirmPasswordMethod(userConfirmPassword)

    const credentials  = {validateFirstName,validateLastName,validateEmailAddress,validatePhoneNumber,validatePassword,validateConfirmPassword};
    console.log(this.validateCredentialsMethod())
    
    if(this.validateCredentialsMethod()){
        const userDetails = {userFirstName,userLastName,userEmailAddress,userPhoneNumber,userPassword,userConfirmPassword}
        
        // add user to firebvase 
        this.addUserFirebase(userFirstName,userLastName,userEmailAddress,userPhoneNumber,userConfirmPassword)
        // auth add user 
        this.addUserWithAuthentication(userEmailAddress,userConfirmPassword,userFirstName,userLastName)
        /*
        const response = await fetch('http://localhost:3001/addusers/',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
              "ID":8,
              "FirstName":`${userFirstName}`,
              "LastName":`${userLastName}`,
              "EmailAddress":`${userEmailAddress}`,
              "phoneNumber":`${userPhoneNumber}`,
              "UserPassword":`${userConfirmPassword}`,
              "nickNames":'vivek'
            })
        })
        const data = await response.json();
        console.log(response)
        console.log(data)
        
        
        console.log(userDetails)


        if(response.ok===true){
          // toast 
          toast.success(`🦄 You Have registered successfully Mr.${userFirstName} ${userLastName}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            setTimeout(()=>{
              this.onSubmitSuccess()
            },5000)
           // this.onSubmitSuccess()
        }
        */
      }
      else{
        console.log("Require Valid Details ")
      }
      
    
  };

  addUserWithAuthentication = async(userEmailAddress,userConfirmPassword,userFirstName,userLastName)=>{
    try{
      const newUser = await createUserWithEmailAndPassword(auth,userEmailAddress,userConfirmPassword);
      console.log(newUser)
      toast.success(`🦄 You Have registered successfully Mr.${userFirstName} ${userLastName}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setTimeout(()=>{
        this.onSubmitSuccess()
      },5000)
      
    }
    catch(error){
        console.log(error.message)
    }
  }

  addUserFirebase = async (userFirstName,userLastName,userEmailAddress,userPhoneNumber,userConfirmPassword)=>{
    const usersCollectionRef = collection(db,"users");
    await addDoc(usersCollectionRef,{FirstName:userFirstName,LastName:userLastName,EmailAddress:userEmailAddress,
      phoneNumber:userPhoneNumber , UserPassword:userConfirmPassword
    })
  }


  onSubmitSuccess = ()=>{
    const{history} = this.props;
    history.replace("/login")
  }

  // validate credentials method used in on click submit method 
  validateCredentialsMethod = ()=>{
    const {userPassword,userConfirmPassword,userFirstName,userLastName,userPhoneNumber,userEmailAddress} = this.state
    const {validateFirstName,validateLastName,validateEmailAddress,validatePhoneNumber,validatePassword,validateConfirmPassword} = this.state;
    const credentials  = {validateFirstName,validateLastName,validateEmailAddress,validatePhoneNumber,validatePassword,validateConfirmPassword};
    console.log(credentials)
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(userPassword===userConfirmPassword && userPhoneNumber.length===10 && regex.test(userEmailAddress)){
          return true
      }else{
        return false
      }
  }

  onClickChangeEyeIcon = ()=>{
    this.setState(prevState=>({showPassword:!prevState.showPassword}))
  }

  onClickConfirmPasswordEye = ()=>{
    this.setState(prevState=>({showConfirmPassword:!prevState.showConfirmPassword}))
  }

  onClickLoginText = ()=>{
    const {history} = this.props
    history.replace("/login")
  }

  // First name 
  onChangeFirstName = (event)=>{
    const firstName = event.target.value;
    if(firstName===""){
      this.setState({validateFirstName:false})
    }else{
    this.setState({userFirstName:firstName})
    this.setState({validateFirstName:true})
    }
  }

  // on chnage last name 
  onChangeLastName = (event)=>{
    const lastName = event.target.value;
    if(lastName===""){
      this.setState({validateLastName:false})
    }else{
      this.setState({validateLastName:true})
      this.setState({userLastName:lastName})
    }
  }

  // On chnage Email Address 
  onChangeEmailAddress = (event)=>{
    const emailAddress = event.target.value;
    if(emailAddress===""){
        this.setState({validateEmailAddress:false})
    }
    else{
      this.setState({userEmailAddress:emailAddress})
      this.setState({validateEmailAddress:true})
    }
  }

  // method to validate email address 
  validateEmailAddress = (emailAddress)=>{
    console.log("ValidateEmail Address")
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(emailAddress) ?
    this.setState({validateEmailAddress:true}):
    this.setState({validateEmailAddress:false})
  }

  // on chnage user phone number and validate phone number 
  onChangePhoneNumber = (event) =>{
    const phoneNumber = event.target.value;
    if(phoneNumber.length===0){
      this.setState({validatePhoneNumber:false})
    }
    else{
      this.setState({userPhoneNumber:phoneNumber})
      this.setState({validatePhoneNumber:true})
    }
  }

  validatePhoneNumber = (phoneNumber)=>{
    console.log("Validate Phone Number ")
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber) && (phoneNumber.length===10)
      ? this.setState({ userPhoneNumber: phoneNumber, validatePhoneNumber: true })
      : this.setState({ validatePhoneNumber: false });
  }

  // onchange password and validate on change password 
  onChangePassword = (event)=>{
    const inputPassword = event.target.value;
    if(inputPassword.length===0 || inputPassword===""){
      this.setState({passwordErrorMessage:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"})
      this.setState({validatePassword:false})
    }else{
      this.setState({passwordErrorMessage:""})
      this.setState({userPassword:inputPassword,validatePassword:true})
    }
  }

  validatePassword = (inputPassword)=>{
    console.log("Validate Password")
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    console.log(inputPassword)
    return regex.test(inputPassword)?
      this.setState({userPassword:inputPassword,validatePassword:true,passwordErrorMessage:""})
      :
      this.setState({validatePassword:false,
        passwordErrorMessage:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"})
    
  }
  

  // confirm password code on chnage 

  onChangeConfirmPassword = (event)=>{
    const inputConfirmPassword = event.target.value;
    if(inputConfirmPassword==="" || inputConfirmPassword.length===0){
      this.setState({validateConfirmPassword:false})
    }else{
      this.setState({validateConfirmPassword:true,userConfirmPassword:inputConfirmPassword})
    }
  }

  validateConfirmPasswordMethod = (inputConfirmPassword)=>{
    console.log("Validte Confirm Password Method")
    const {userPassword} = this.state
    if(userPassword===inputConfirmPassword){
      this.setState({validateConfirmPassword:true})
    }else{
      this.setState({validateConfirmPassword:false})
    }

    const {validateConfirmPassword,userConfirmPassword} = this.state
    console.log("confirm password:"+validateConfirmPassword);
    console.log("userpassword+userConfirm password"+userConfirmPassword+userPassword);
  }
    /*
  componentDidMount = ()=>{
    this.getNickNamesData()
  }

  getNickNamesData = async()=>{
      const response = await fetch('https://us-central1-eastside-vaccine.cloudfunctions.net/generateNames')
      const responseData = await response.json()

      console.log(responseData)
  }
  */

  // Toast Container 

    render()
    {
        const {showPassword,NickNames,showConfirmPassword} = this.state;


        // validate and get first name 
        const {userFirstName,validateFirstName} = this.state;

        // validate and get last name 
        const {userLastName,validateLastName} = this.state;
        
        // validate and get email address 
        const {userEmailAddress,validateEmailAddress} = this.state;

        // validte and get phone number 
        const {userPhoneNumber,validatePhoneNumber}=this.state;

        //validate and get password  and password error message
        const {userPassword,validatePassword,passwordErrorMessage} = this.state;

        // validate and get confirm password details 
        const {userConfirmPassword,validateConfirmPassword} = this.state

        // create user details object 
        const userDetails = {userFirstName,userLastName,userEmailAddress,validateEmailAddress,
          userPhoneNumber,validatePhoneNumber,userPassword,validatePassword,userConfirmPassword,validateConfirmPassword}
        //console.log(userDetails)


        // show and hide password eye icon image src 
        const PasswordEye = showPassword ? "https://img.icons8.com/emoji/48/000000/eye-emoji.png" 
        : "https://img.icons8.com/office/16/000000/closed-eye.png";
        const passwordConfirmEye = showConfirmPassword ? "https://img.icons8.com/emoji/48/000000/eye-emoji.png" 
        : "https://img.icons8.com/office/16/000000/closed-eye.png";

        // first name photo icon 
        const FirstNameProfilePhoto = "https://img.icons8.com/color/48/000000/name--v1.png";

        // lastname profile photo icon 
        const LastNameProfilePhoto = "https://img.icons8.com/office/16/000000/family--v3.png";

        // @ icon 
        const atTheRateIcon = "https://img.icons8.com/fluency/48/000000/email.png";

        // phone icon 
        const phoneIconLogo = "https://img.icons8.com/color/48/000000/phone.png";
        
        
        

        return(
          <div className="login_page_container">
          <div className="signup_page_header_container">
            <SignUpLoginHeader/>
          </div>
          {/**Signup form container has regsyy=ter now heading container and form_info container */}
          <div className="signup_form_container">
            {/**Register Now heading Container */}
            <div className="signup_heading_container">
              <h1 className="registernow_heading">Register Now</h1>
            </div>

            {/**form_info container has we listen info and sign up form  */}
            <div className="form_info_container">
              <InfoContainer/>
           
           <Form className="form_container" onSubmit={this.handleSubmit}>
            <Row>

              {/*First name  */}
                <Form.Group md="4" controlId="validationCustomFirstName">
                <Form.Label>First Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <img src={FirstNameProfilePhoto} className="FirstName_profilePic" alt="firstName_icon"/></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange = {this.onChangeFirstName}
                  />
                </InputGroup>
                {validateFirstName ? null :<p className="error_message">* Require First Name</p>}
              </Form.Group>


              {/*Last name  */}
              <Form.Group md="4" controlId="validationCustomLastName" className="mb-2">
                <Form.Label>Last Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <img src={LastNameProfilePhoto} className="Lastname_profilePic" alt="lastName_icon"/>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={this.onChangeLastName}
                  />
                  
                </InputGroup>
                {validateLastName ? null :<p className="error_message">* Require Last Name</p>}
              </Form.Group>


               
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
                    onChange={this.onChangeEmailAddress}
                  />
                  
                </InputGroup>
                {validateEmailAddress ? null:<p className="error_message">* Required Valid Email Address</p>}
              </Form.Group>
                
               {/**phone number*/}
               <Form.Group md="4">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <img src={phoneIconLogo} className="phone_logo_icon" alt="phone_icon"/>+1
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    aria-describedby="inputGroupPrepen"
                    required 
                    pattern="[0-9]{10}"
                    onChange = {this.onChangePhoneNumber}
                  />
                </InputGroup>
                {validatePhoneNumber ? null:<p className="error_message">* Required Valid Phone Number</p>}
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
                    onChange={this.onChangePassword}
                  />
                </InputGroup>
                {validatePassword ? null:<p className="error_message">* {passwordErrorMessage}</p>}
              </Form.Group>


              {/* Confirm Password */}
              <Form.Group md="4" controlId="validationCustomConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend" onClick={this.onClickConfirmPasswordEye}>
                  <img className="eye_image" src={passwordConfirmEye} alt="open_clodes_eye_icon"/>
                  </InputGroup.Text>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={this.onChangeConfirmPassword}
                  /> 
                </InputGroup>
                {validateConfirmPassword? null : <p className="error_message">* Password don't match</p>} 
              </Form.Group>

              {/**Select NickName */}

              <Form.Group controlId="formGridState">
                <Form.Label>Select Your Nick Name</Form.Label>
                <Form.Select defaultValue={NickNames[0]}>
                  <option value={NickNames[1]}>{NickNames[1]}</option>
                  <option value={NickNames[2]}>{NickNames[2]}</option>
                  <option value={NickNames[3]}>{NickNames[3]}</option>
                  <option value={NickNames[4]}>{NickNames[4]}</option>
                  <option value={NickNames[5]}>{NickNames[5]}</option>
                  <option value={NickNames[6]}>{NickNames[6]}</option>
                </Form.Select>
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
              <Button type="submit">SignUp</Button>
              <ToastContainer/>
              <p className="already_have_account">Already Have a Account ? <span className="on_click_login"
              onClick={this.onClickLoginText}>Login</span></p>
            </Form>
              </div>
              
            </div>
          </div>      
        )
    }
}

export default SignUpPage;