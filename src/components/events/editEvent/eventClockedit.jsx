import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TimeKeeper from '../../react-timekeeper';
import "../../../sass/main/events/user.scss";
export default class TimeEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '6:50',
            displayTimepicker: true
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }
    handleTimeChange(newTime){
        let newState = Object.assign({}, this.state);
        newState.time = newTime.formatted24;
        console.log(newTime);
        console.log(this.state.time);
        this.setState(newState);
    }
  
    render(){
        return (
            <div>
                {this.props.visibility ? (
                    <TimeKeeper
                        time={this.state.time}
                        onChange={this.handleTimeChange}
                        onDoneClick={() => {
                            this.props.clockHandleVisibility
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                    ):
                    ''
                }
                {/* <span>Time is {this.state.time}</span>
                <button onClick={() => this.toggleTimekeeper(true)}>OPEN</button> */}
            </div>
        )
    }
} 