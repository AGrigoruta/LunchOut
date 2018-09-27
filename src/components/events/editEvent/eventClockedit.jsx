import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TimeKeeper from '../../react-timekeeper';
import "../../../sass/main/events/user.scss";
export default class TimeEdit extends React.Component {
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
                    this.props.visibility ? (
                        <div className="evenet__timer__div">

                            <div>
                                {this.props.visibility ?
                                    <TimeKeeper
                                        time={this.state.time}
                                        onChange={this.handleTimeChange}
                                        onCancelClick={this.props.handleVisibility}
                                        onDoneClick={() => {
                                            let payload = {
                                                startTime: this.state.time
                                            }
                                            axios.put(`https://localhost:8080/api/event/${this.props.id}`, payload).then((resp)=> {
                                                console.log(resp);
                                                this.props.clockHandleVisibility();
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