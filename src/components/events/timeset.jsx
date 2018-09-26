import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TimeKeeper from '../react-timekeeper';
import "../../sass/main/events/user.scss";
export default class Timeset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '6:50',
            displayTimepicker: true,
            user: '',
            location: ''

        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    componentDidMount() {

    }


    handleTimeChange(newTime) {
        this.setState({ time: newTime.formatted24 })
        
    }
    toggleTimekeeper(val) {
        this.setState({ displayTimepicker: val })
    }
    render() {
        return (
            <div>
                {
                    this.props.divdisplay ? (
                        <div className="evenet__timer__div">

                            <div>
                                {this.props.divdisplay ?
                                    <TimeKeeper
                                        time={this.state.time}
                                        onChange={this.handleTimeChange}
                                        onCancelClick={this.props.handleVisibility}
                                        onDoneClick={() => {
                                            
                                            axios.get("https://localhost:8080/auth/logged")
                                                .then(res => {

                                                    this.setState({
                                                        user: res.data.user.authId,
                                                        location: this.props.location
                                                    })

                                                }).then(() => {
                                                    this.props.handleVisibility()
                                                })
                                                .then(() => {
                                                    fetch('https://localhost:8080/api/event', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            'creatorID': this.state.user,
                                                            'location': this.state.location,
                                                            'startTime': this.state.time,
                                                            'status': 'Planned',
                                                            'participantsID': [this.state.user]
                                                        })
                                                    })
                                                })
                                        }

                                        }
                                        switchToMinuteOnHourSelect={true}
                                    />
                                    :
                                    ""
                                }
                            </div>

                            {/* <div>
                        <span>Time is {this.state.time}</span>
                        <button onClick={() => this.toggleTimekeeper(true)}>OPEN</button>
                            </div> */}
                        </div>

                    ) : ""}

            </div>
        )
    }
} 