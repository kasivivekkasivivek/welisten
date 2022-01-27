
import { Component } from "react";
import NavBarPage from "../NavBarPage";

import {db} from "../FirbaseDb"
import {collection,getDocs} from "firebase/firestore"
// 
import "./meetingStyle.css";

class MeetingDataBase extends Component{

    state = {
        usersList:[]
    }
    
    componentDidMount = ()=>{
        this.getUsersList()
    }

    getUsersList = async()=>{
        const usersCollectionRef = collection(db,"users");
        const data = await getDocs(usersCollectionRef);
        this.setState({usersList:data.docs.map((doc)=>({...doc.data(),id : doc.id}))})
    }

    render(){
        const {usersList} = this.state
        console.log(usersList)
        return(
            <div className="meeting_database_main_container">
                <NavBarPage/>
                <div className="meeting_database_container">
                    <h1>cskv</h1>
                </div>
                
            </div>
        )
    }
}

export default MeetingDataBase;