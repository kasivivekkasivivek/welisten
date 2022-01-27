
// import react Router dom 
import {BrowserRouter} from "react-router-dom"
import { Switch, Route } from "react-router-dom";

// import app.css styling 
import './App.css';

// import SignUp Page 
import SignUpPage from './components/SignUp';

// import Login Page 
import LoginPage from "./components/LoginPage";
import { Component } from 'react';
import AppGuidePage from "./components/AppGuidePage";
import HomePage from "./components/HomePage";
import NavBarPage from "./components/NavBarPage";
import MeetingDataBase from "./components/MeetingDataBase";
import Scheduling from "./components/Scheduling"
// Router Components 

import ProtectedRoute from "./components/ProtectedRoute";


function App(){


    return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exxact path="/app-guide-path" component={AppGuidePage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <ProtectedRoute exact path="/scheduling" component={Scheduling}/>
            <Route exact path="/meeting-database" component={MeetingDataBase}/>
          </Switch>
        </BrowserRouter>

    )
  
}

export default App;
