import { Component } from "react";

import dateFormatter from 'date-format-conversion';

import "./index.css";

class EachSchedulingComponent extends Component{

    render(){
        const {details} = this.props
        console.log(details)
        const {name,moderator,max_limit,currentNumberOfParticipents,startTime} = details
        const dateVar = Date.parse(startTime)
        const currentDate = dateFormatter(new Date,'MM-DD-YYYY hh:mm:ss')
        const mettingStartDate = dateFormatter(dateVar ,'MM-DD-YYYY hh:mm:ss')
        console.log(mettingStartDate)
        console.log("current date "+currentDate)
        var status = "";
        if(currentDate > mettingStartDate){
            status="Meeting Stated"
        }
        else{
            status = "Metting is yetr to start"
        }
        return(

            <li className="each_metting_box">
                <div className="metting_data_container">
                    <h3>{name}</h3>
                    <p> {status} </p>
                    <p>Session Start Time : {startTime}</p>
                    <p> Current Number of Participants : {currentNumberOfParticipents}/{max_limit}</p>
                    <p>Moderator : {moderator}</p>
                </div>
            </li>
        )
    }
}

export default EachSchedulingComponent