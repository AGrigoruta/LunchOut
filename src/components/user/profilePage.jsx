import React, { Component } from 'react';
import { imgBackground } from '../../view/images/add.png';
import Card from '../events/card';


import axios from "axios";
import UserEvent from './userEvent';


export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
            this.state={
                user: "",
                event: "",
                
            }
            this.fetchData();
    }

     fetchData = () => {
        axios.get('https://localhost:8080/auth/logged')
            .then(res => {
                this.setState({
                   user: res.data.user
                });
                
            })
            .then(axios.get('https://localhost:8080/profilePage/' + this.state.user.authId)
                .then(res =>{
                    this.setState({
                        event: res.data
                    });
                })
            )
    } 
    render() {
        console.log(this.state.event);
        const {location , startTime, photo, id, creatorId} = this.state.event;
        return (
            <div className="userInterface">
                <div className="interfaceContainer">
                    <div className="userBackground"></div>
                    <img  className="userProfileImage" src={this.state.user.thumbnail} />
                    <h1> {this.state.user ? this.state.user.username : 'N/A'} </h1>
                    <div className="lastEvent"></div>
                </div>
               <div className="pastEvents">
                    {/* <Card location={location}
                        time={startTime}
                        photo={photo}
                        id={id}
                        userId={profileID}
                        creatorId={creatorId} /> */}
                        <UserEvent
                        location={location}
                        time={startTime}
                        photo={photo}
                        id={id}
                        userId={this.state.user.profileID}
                        creatorId={creatorId}  />
                </div> 
            </div>
        );
    }
}