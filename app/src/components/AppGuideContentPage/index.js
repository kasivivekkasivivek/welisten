
import { Component } from "react";

// import css
import "./appGuideContentStyling.css"

class AppGuideContentPage extends Component{

    render(){

        return(
            <div className="app_guide_content_page_container">
                <div className="guide_content_page_heading_container">
                    <h1 className="guide_contnet_page_heading">
                        How To Use Out Application
                    </h1>
                </div>

                <div className="guide_page_content_container">
                    <p className="guide_page_contnet_para">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>



                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/vlDzYIIOYmM" allowFullScreen></iframe>
                </div>
                </div>
            
        )
    }
}


export default AppGuideContentPage
