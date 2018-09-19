import React from 'react';
import logon from '../../view/images/LunchOut.png';

export default class NoEvents extends React.Component{
    
    render(){
        return(
        <div className= "noEventss">
            <img src={logon} className="noEventsLogo" alt="logo"/>
            <p className="noEventsText"> No events around you. Use the + button to create a new one</p>
        </div>
    )};
}