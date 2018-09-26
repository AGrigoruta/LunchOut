import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TimeKeeper from '../../react-timekeeper';
import "../../../sass/main/events/user.scss";
export default class TimeEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '6:50 am',
            displayTimepicker: true
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }
    handleTimeChange(newTime){
        this.setState({ time: newTime.formatted})
    }
  
    render(){
        return (
            <div>
                {this.props.visibility ?
                    <TimeKeeper
                        time={this.state.time}
                        onChange={this.handleTimeChange}
                        onDoneClick={() => {
                            this.props.clockHandleVisibility
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                    :
                    false
                }
                {/* <span>Time is {this.state.time}</span>
                <button onClick={() => this.toggleTimekeeper(true)}>OPEN</button> */}
            </div>
        )
    }
} 