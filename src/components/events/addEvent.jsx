import React from 'react';
import "../../css/index.css";

export default class addEvent extends React.Container{
    render(){
        return(
            <div className="addEventContainer">
                <div className="addEventContainer__search">
                   <form>
                       <input type="text" name="search" placeholder="" />
                   </form>
                </div>
            </div>
        );
    }
}