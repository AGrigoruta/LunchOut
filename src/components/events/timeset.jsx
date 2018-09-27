import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import TimeKeeper from '../react-timekeeper';
import "../../sass/main/events/user.scss";
import firebase from 'firebase';
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
        console.log(firebase.app())
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
                                                    console.log(res)

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
                                                    }).then(() => {
                                                        // ---------------- > send notification in here < ----------------
                                                        // fetch('https://fcm.googleapis.com/fcm/send', {
                                                        //     method: 'POST',
                                                        //     headers: {
                                                        //         'Content-Type':'application/json', 
                                                        //         'Authorization':"Bearer: " + accessToken 
                                                        //     },
                                                        //     body: {
                                                        //         "message": {
                                                        //             "token": "f8idb2w2O4I:APA91bGYYVK4X5i0lOGZvolCYyQDVZQkYksVDPPnVriVX7XBePR9QfdztF1jZduM0mRGE0ylnozw3X5Fv5VE0EcRx7zjJt5Rsi1egIaxX7FlTKwgILlsRA7yzU_zP4833DqBKkQ4poxJ",
                                                        //             "notification": {
                                                        //                 "body": "New event added",
                                                        //                 "title": "Let's go eat"
                                                        //             }
                                                        //         }
                                                        //     }
                                                        // });
                                                        let payload = {
                                                            message: {
                                                                token: window.FCMToken,
                                                                notification:{
                                                                    body: "New event added near you",
                                                                    title: this.state.location
                                                                }
                                                            }
                                                        }
                                                        axios.post('https://localhost:8080/api/notification', payload).then((resp) => {
                                                            console.log('tried to notif');
                                                        })
                                                        // fetch('https:////fcm.googleapis.com/v1/projects/lunch-out/messages:send',{
                                                        //     method:'POST',
                                                        //     headers:{
                                                        //         'Content-Type':'application/json',
                                                        //         'Authorization':'AAAAb65H_5Q:APA91bExIUrDvUirUuiXQx4lhXodNVvMVz9L35XcFNqCidr4ayXWWSxxlc94LsAxBYlXZNuuvZgUwWt9k9--OOQ25oWudRs_31yTRphUc7-ZjJ3fw0cyL1rJdUQQm9zPPqAjRwY0oAwy'
                                                        //     },
                                                        //     body: {
                                                        //         "message": {
                                                        //             "token":"BLJ69fnGE2ky_XH-6jRK9gA5-F5_ajU-gOubWyrpKpQunnVRU2RHQ12_X710xn8dSOnDQwJ5v8YI25cSikwMWw0",
                                                        //             "notification":{
                                                        //                 "body": "New event added",
                                                        //                 "title": "Let's go eat",
                                                        //             }
                                                        //         }
                                                        //     }
                                                        // })
                                                        // ------------------------- > CAZINO < --------------------------
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