
import { Component } from "react";
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"

import "./navBarStyles.css"

import {Link} from "react-router-dom"

import {withRouter} from "react-router-dom"

//to use cookies import 
import Cookies from "js-cookie"



class NavBarPage extends Component{

    state={
        isLoggedIn:true,
        isAdmin:true,
    }

    onClickLogoutIcon = ()=>{

        const {history} = this.props
        Cookies.remove('jwt_token')
        Cookies.remove('user_email')
        history.replace("/login");
        this.handleJwtToken()
    }

    onClickLogginButton = ()=>{
        const {history} = this.props 
        history.replace("/login");
        this.handleJwtToken()
    }

    componentDidMount = ()=>{
        this.handleJwtToken()
    }
    
    handleJwtToken = ()=>{
        const jwtToken = Cookies.get('jwt_token')
        //console.log("jwt_token value : "+jwtToken)
        if(jwtToken===undefined){
            this.setState({isLoggedIn:false})
        }else{
            this.setState({isLoggedIn:true})
        }
        const {history} = this.props

    }

    render(){
        const {email} = this.props
        // get is loggedIn from state 
        const {isLoggedIn} = this.state;

        // get is admin from the state 
        const {isAdmin} = this.state;

        // logo src
        const LogoSrc = "https://listeningears.org/wp-content/uploads/listening-ears-we-listen-810x500.jpg";

        //lohout icon 
        const logoutIcom = "https://img.icons8.com/external-others-sbts2018/58/000000/external-logout-social-media-others-sbts2018.png";

        

        return( 
            <div className="nav_bar_container">
                <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="nav_bar_sub_container" fixed="top">
                    
                    <Link to="/" className="link_item">
                    <Navbar.Brand>
                        <img className="logo_image_navbar" alt="logo_image_alt" src={LogoSrc}/>
                    </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                
                            </Nav>
                            
                            <Nav className="me-auto">
                                
                            </Nav>
                            <Nav className="mr-auto p-2">
                                {/* Link to Home page nav item  */}
                                <Link to="/" className="link_item">
                                    <Nav.Link href="#features">Home</Nav.Link>
                                </Link>

                                {/* Link to app guide page  */}
                                <Link to="/app-guide-path" className="link_item">
                                    <Nav.Link href="#pricing">App Guide</Nav.Link>
                                </Link>

                                {/**Scheduling meeting link  */}
                                <Link to="/scheduling" className="link_item">
                                {isLoggedIn ?
                                <Nav.Link href="#deets">Scheduling</Nav.Link>:
                                null
                                }
                                </Link>
                                
                                {/**User Database details  */}
                                {
                                    <Link to="/meeting-database" className="link_item">
                                   { isAdmin ? 
                                    <Nav.Link href="#meetingDatabase">Meeting Database</Nav.Link>:
                                    null
                                   }
                                    </Link>
                                }

                                
                                {/**Login button or user name details  */}
                                
                                {
                                    isLoggedIn ?
                                    /*
                                <Nav.Link eventKey={2} href="#username">
                                    <span className="user_name_text">Vivek Reddy</span>
                                    <span className="user_image_shortcut">VR</span>
                                </Nav.Link>*/
                                null
                                :
                                <button className="animated-button1" onClick={this.onClickLogginButton}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Login
                                </button>
                                }

                                {/**Logout icon */}
                                
                                {isLoggedIn ?
                                <Nav.Link onClick={this.onClickLogoutIcon}>
                                    <img className="logout_icon_navbar" src={logoutIcom}/>
                                </Nav.Link>:
                                null
                                }


                            </Nav>
                        </Navbar.Collapse>
                    
                </Navbar>
            </div>
        )
    }
}


export default withRouter(NavBarPage)