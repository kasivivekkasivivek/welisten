
import { Component } from "react";
import AppGuideContentPage from "../AppGuideContentPage";
// import app guide page 
import AppGuidePage from "../AppGuidePage";
import MainPageContent from "../MainPageContent";
import NavBarPage from "../NavBarPage";

class HomePage extends Component{

    render(){

        return(
            <div className="home_page_container">
                <NavBarPage/>
                <MainPageContent/>
                <AppGuideContentPage/>
            </div>
        )
    }
}

export default HomePage;