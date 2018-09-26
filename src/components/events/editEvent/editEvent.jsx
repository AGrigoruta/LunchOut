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
        this.handleClockVisibility =  this.handleClockVisibility.bind(this);
        this.handleLocationVisibility =  this.handleLocationVisibility.bind(this);
    }
    handleLocationVisibility(){
        this.setState({
            handleLocation: !this.handleLocation
        })
    }
    handleClockVisibility(){
        this.setState({
            handleClock: !this.handleClock
        })
    }
    render() {
        return (
            <div className="edit__container">
                    {this.state.handleLocation ? (
                    <div className="addEventContainer"><LocationEdit
                        visibility = {this.state.handleLocation}
                        clockLocationVisibility={this.handleLocationVisibility}
                    /> </div>) : ''}
                    
                    { this.state.handleClock ? (<div className="edit__container__clockdiv">
                    <TimeEdit 
                                visibility = {this.state.handleClock}
                                clockHandleVisibility={this.handleClockVisibility}
                            />
                    </div>) : (<div className="DeleteStuff">
                    
                    {
                        this.props.toggleEdit ? (
                            <div className="DeleteEvent">
                    <div className="DeleteEventContainer">
                        <p className="DeleteEventText">What you want to edit on {this.props.event} event ?</p>
                        <div className="buttons">
                            <div className="button-background" onClick={()=>{
                                // axios.delete("https://localhost:8080/api/event/"+this.props.id)
                                // .then((resp) => {
                                //     this.props.callbackFromParentEdit(false);
                                // })
                            }}>
                                <p className="Yes" onClick={this.handleClockVisibility }>Time</p>
                                
                            
                                
                            </div>
                            <div className="button-background" onClick={this.handleLocationVisibility}>
                                <p className="No">Location</p>
                            </div>
                        </div>
                    </div>
                </div>
                        ) : ''
                    }
                </div>)}
            </div>
        )
    }
}
