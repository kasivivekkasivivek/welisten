
import { Component } from "react"
import NavBarPage from "../NavBarPage"

import EachSchedulingComponent from "../EachSchedulingComponent";

// DATE FORMATOR
import dateFormatter from 'date-format-conversion';

import "./index.css"

const schedulingArray = [
    {
        "id":1,
        "name":"IT/CS Track",
        "startTime":"November 20,2021 15:50:00",
        "moderator":"Hybrid",
        "max_limit":100,
        "currentNumberOfParticipents":2
    },
    {
        "id":2,
        "name":"Enterprenuar Track",
        "startTime":"January 1,2022 at 15:50:00 PM",
        "moderator":"Hybrid",
        "max_limit":100,
        "currentNumberOfParticipents":2
    },
    {
        "id":3,
        "name":"IT/CS Track",
        "startTime":"November 19,2021 at 15:50:00",
        "moderator":"Hybrid",
        "max_limit":100,
        "currentNumberOfParticipents":2
    }
]
class Scheduling extends Component{

    state={
        scheduledMeetings:schedulingArray
    }

    render(){
            const {scheduledMeetings} = this.state
            //console.log(scheduledMeetings)
            //const dateVar = Date.parse(scheduledMeetings[0].startTime)
            //console.log(dateFormatter(dateVar ,'MM-DD-YYYY hh:mm:ss'))
        return(
            <div className="scheduling_contaoiner">
                <NavBarPage/>
                <div className="scheduling_main_container">
                    <h1 className="scheduling_meeting_heading"> Scheduled Mettings</h1>
                    <ul className="unorderd_scheduled_list_items">

                        {scheduledMeetings.map(eachItem=>(
                            <EachSchedulingComponent details={eachItem} key={eachItem.id}/>
                        ))}
                    </ul> 
                </div>
            </div>
        )
    }
}

export default Scheduling