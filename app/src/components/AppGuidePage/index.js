
import {Component} from "react"
import AppGuideContentPage from "../AppGuideContentPage";
import NavBarPage from "../NavBarPage";

// import css
import "./appGuideStyles.css"

class AppGuidePage extends Component{

    render(){

        return(
            <div className="page_container">
                <NavBarPage/>   


                <AppGuideContentPage/>
                
                
            </div>  
        )
    }
}

export default AppGuidePage;