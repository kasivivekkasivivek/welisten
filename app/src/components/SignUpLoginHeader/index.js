
import { Component } from "react";
import './SignUpLogin.css';

import {Link} from "react-router-dom";

class SignUpLoginHeader extends Component{


    render(){
        const LogoSrc = "https://listeningears.org/wp-content/uploads/listening-ears-we-listen-810x500.jpg";
        
        return(
            <div className="signup_login_container">
                <div className="logo_container">
                    <Link to="/">
                        <img className="logo_image" alt="logo_image_alt" src={LogoSrc}/>
                    </Link>
                </div>
                

                <div className="login_signup_button_container">
                    <Link to={'/login'}>
                <button className="animated-button1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </button>
                </Link>

                
                <Link to={'/signup'}>
                <button className="animated-button2 animated-button1" onClick={this.onClickSignUpButton}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign-Up
                </button>
                </Link>
                </div>
            </div>
        )
    }
}

export default SignUpLoginHeader;