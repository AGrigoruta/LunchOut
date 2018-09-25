import React from 'react';
import '../../../css/index.css';

import bin from '../../../view/images/trash-can.png';
import axios from 'axios';
import TimeEdit from './eventClockedit';

export default class EditEvent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            handleClock: false ,
            objects: [
                {
                    location: 'Beer Platz',
                }
            ]
        }
        this.handleClockVisibility =  this.handleClockVisibility.bind(this);
    }
    handleClockVisibility(){
        this.setState({
            handleClock: !this.handleClock
        })
    }
    render() {
        return (
            <div className="DeleteStuff">
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
                            <p className="Yes" onClick={this.handleClockVisibility &&  this.props.callbackFromParentEdit(false)}>Time</p>
                            <TimeEdit 
                                visibility = {this.state.handleClock}
                            />
                        </div>
                        <div className="button-background" onClick={()=>{this.props.callbackFromParentEdit(true)}}>
                            <p className="No">Location</p>
                        </div>
                    </div>
                </div>
            </div>
                    ) : ''
                }
            </div>
        )
    }
}
