import React from 'react';
import '../../../css/index.css';


export default class JoinEvent extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="joinContainer">
                <div className="DeleteEvent">
                            <div className="DeleteEventContainer">
                            <div>
                                <p className="DeleteEventText">Do you want to join {this.props.event} event ?</p></div>
                                <div className="buttons">
                                    <div className="button-background" onClick={
                                        //this.handleClockVisibility
                                    } >
                                        <p className="Yes">Join</p>
                                    </div>
                                    <div className="button-background" onClick={//this.handleLocationVisibility
                                    }>
                                        <p className="No">No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        );
    }
}