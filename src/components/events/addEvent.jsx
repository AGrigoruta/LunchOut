import React from 'react';
import "../../css/index.css";
import searchEvent from "../../view/images/searchicon.png";

export default class addEvent extends React.Component{
    render(){
        return(
            <div className="addEventContainer">
                <div class="input-container">
                <img className="icon" src={searchEvent} />
                <input class="input-field" type="text" placeholder=" " />
                </div>
            </div>
        );
    }
}