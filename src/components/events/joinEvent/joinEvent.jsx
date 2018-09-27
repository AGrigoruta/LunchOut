import React from 'react';
import axios from 'axios';
import '../../../css/index.css';


export default class JoinEvent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            participants: [""]
        }

    }
    render(){
        return(
            <div className="joinContainer">
                { this.props.visibility ? (
                <div className="DeleteEvent">
                
                            <div className="DeleteEventContainer">
                            <div>
                                <p className="DeleteEventText">Do you want to join the event ?</p></div>
                                <div className="buttons">
                                    <div className="button-background" onClick= {()=>{
                                        fetch(`https://localhost:8080/api/event/${this.props.id}` )
                                                    .then(response => response.json())
                                                    .then(parsedJSON =>{

                                                        this.setState({
                                                            participants: parsedJSON.participantsID
                                                        })
                                                        
                                                    })
                                                    .then(()=>{
                                                        let x = true;
                                                        for(let i=0;i<this.state.participants.length;i++){
                                                                if(this.state.participants[i]==this.props.userId)
                                                                    x=false
                                    
                                                        }
                                                        if(x){
                                                            this.state.participants.push(this.props.userId);
                                                            axios.put(`https://localhost:8080/api/event/${this.props.id}`, {
                                                                "participantsID" : this.state.participants
                                                            }).then((resp)=> {
                                                                console.log(resp);
                                                                this.props.handleJoin();
                                                            })
                                                        }
                                                        else{
                                                            this.props.handleJoin();
                                                        }
                                                    })
                                                    .then(()=>{
                                                        this.props.callbackFromJoin();
                                                    })
                                        
                                    }} >
                                        <p className="Yes">Join</p>
                                    </div>
                                    <div className="button-background" onClick={ this.props.handleJoin}>
                                        <p className="No">No</p>
                                    </div>
                                </div>
                            </div>
                        </div>) : " "} 
            </div>
        );
    }
}