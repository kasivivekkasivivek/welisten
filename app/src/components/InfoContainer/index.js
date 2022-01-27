
import {Component} from "react";
import VideoPlayer from "../VideoPlayer";
import "./infoContainer.css";

class InfoContainer extends Component{

    state={
        open:false,
    }

    onOpenModal = () => {
        this.setState(prevState => ({
          open: !prevState.open
        }));
      };

    render(){
        const LogoSrc = "https://listeningears.org/wp-content/uploads/listening-ears-we-listen-810x500.jpg";
        const iosLogo = <img src="https://img.icons8.com/ios/50/000000/mac-os--v2.png"/>;
        return(
            <div className="info_container">
                <img src={LogoSrc} className="signup_logo_image" alt="signup_logo_image_alt"/>
                <p className="info_container_text">
                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <div className="video_player_button_container">
                    <VideoPlayer/>
                </div>
                <div className="download_button_container">
                    
                    <div className="ios_container">
                        <button type="button" className="btn-flip" data-back="Download IOS App" 
                        data-front="IOS Application"></button>
                        <img className="ios_logo_icon" src="https://img.icons8.com/nolan/50/mac-os.png"/>
                     </div>

                    <div className="android_container">
                        <button type="button" className="btn-flip" data-back="Download Android App" 
                                data-front="Android Application">
                        </button>
                        <img className="android_logo_icon" src="https://img.icons8.com/nolan/50/android-os.png"/>
                    </div>

                </div>
            </div>
        )
    }
}


export default InfoContainer