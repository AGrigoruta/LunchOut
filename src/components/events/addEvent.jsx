import React from 'react';
import "../../css/index.css";
import searchEvent from "../../view/images/searchicon.png";
import "../../sass/main/events/user.scss";
import Timeset from "./timeset.jsx";

export default class addEvent extends React.Component{
    constructor(props){
        super(props);
        this.state = {clickTimerButton: true} 
       this.handleTimer = this.handleTimer.bind(this);
    }
    handleTimer(){
        this.setState({
            clickTimerButton: ! this.state.clickTimerButton
           
         })
    }
    render(){
        return(
            <div className="addEventContainer">
                <div class="input-container">
                <img className="icon" src={searchEvent} />
                <input class="input-field" type="text" placeholder=" " />
                </div>
                <div className="event__clock">
                
                <Timeset
                     handleVisibility = {this.handleTimer}
                    divdisplay={this.state.clickTimerButton}
                 />
                </div>
               <button onClick={this.handleTimer }>Click here</button>
            </div>
        );
    }
}