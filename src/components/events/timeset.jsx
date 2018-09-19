import React from 'react';
import TimeKeeper from 'react-timekeeper';
import "../../sass/main/events/user.scss";
export default class Timeset extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '6:50 am',
            displayTimepicker: true
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }
    handleTimeChange(newTime){
        this.setState({ time: newTime.formatted})
    }
    toggleTimekeeper(val){
        this.setState({displayTimepicker: val})
    }
    render(){
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
                                onDoneClick={this.props.handleVisibility}
                                switchToMinuteOnHourSelect={true}
                            />
                            :
                            false
                        }
                    </div>
            
                        {/* <div>
                        <span>Time is {this.state.time}</span>
                        <button onClick={() => this.toggleTimekeeper(true)}>OPEN</button>
                     </div> */}
                     </div>
                      
            )  : ""}
                   
            </div>
        )
    }
} 