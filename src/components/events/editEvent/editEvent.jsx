import React from 'react';
import '../../../css/index.css';
import TimeKeeper from 'react-timekeeper';
import bin from '../../../view/images/trash-can.png';
import axios from 'axios';
import TimeEdit from './eventClockedit';
import LocationEdit from './editLocation';

export default class EditEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            handleClock: false ,
            handleLocation: false,
            objects: [
                {
                    location: 'Beer Platz',
                }
            ]
        }
       // this.handleClockVisibility =  this.handleClockVisibility.bind(this);
       // this.handleLocationVisibility =  this.handleLocationVisibility.bind(this);
    }
    handleLocationVisibility=()=>{
        const {callbackFromParentEdit} = this.props;
        this.setState({
            handleLocation: !this.state.handleLocation
        })
        callbackFromParentEdit()

   
    }

    handleClockVisibility=()=>{
        const {callbackFromParentEdit} = this.props;
        this.setState({
            handleClock: !this.state.handleClock
        })
        callbackFromParentEdit()
    }
    render() {
        return (
            <div className="main__card__component">
                <div className={this.state.handleClock ? "clockDiv" : "opac"}>
                    <div className="clockDiv__raw">
                    <TimeEdit 
                        visibility={this.state.handleClock}
                        clockHandleVisibility={this.handleClockVisibility}
                        id={this.props.id}
                        />
                        </div>
                </div>
                <div className={this.state.handleLocation ? "locationDiv" : "opac"}>
                    <LocationEdit
                        visibility={this.state.handleLocation}
                        handleLocationVisibility={this.handleLocationVisibility}
                        id={this.props.id}
                        />
                </div>
                {
                    this.props.toggleEdit ? (
                        <div className="DeleteEvent">
                            <div className="DeleteEventContainer">
                            <div>
                                <p className="DeleteEventText">Are you sure you want to edit {this.props.event}</p></div>
                                <div className="buttons">
                                    <div className="button-background" onClick={
                                        this.handleClockVisibility} >
                                        <p className="Yes">Time</p>
                                    </div>
                                    <div className="button-background" onClick={this.handleLocationVisibility}>
                                        <p className="No">Location</p>
                                    </div>
                                    
                                </div>
                                <div className="cancel__button" onClick={this.props.close}>
                                        <p className="cancel__button__text">Cancel</p>
                                </div>
                            </div>
                        </div>

                    ): ""}
            </div>
        )
    }
}
