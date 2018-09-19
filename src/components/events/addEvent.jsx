import React from 'react';
import "../../css/index.css";
import Search from "../events/search.js";
import axios from 'axios';
import placeholder from "../../view/images/placeholder.png"
import searchEvent from "../../view/images/searchicon.png";
import "../../sass/main/events/user.scss";
import Timeset from "./timeset.jsx";

export default class addEvent extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            latlong: "",
            venues:[],
            clickTimerButton: true
        };
        this.handleTimer = this.handleTimer.bind(this);
    }
    handleTimer(){
        this.setState({
            clickTimerButton: ! this.state.clickTimerButton
            
            })
    }
    componentDidMount(){
        this.getLocation();
    }
    getLocation=()=>{
        navigator.geolocation.getCurrentPosition(response =>{
            this.setState({
                latlong: response.coords.latitude+","+response.coords.longitude
            },()=>{
                this.getVenues("restaurants")
            });
        });
    };
    
    getVenues=(food)=>{
        const endPoint="https://api.foursquare.com/v2/venues/explore?";
        const params={
            client_id:"EFSQIR4NPI5MRIF0DMGMF14COGKRFR4FWD3EXKXFTVP0TAKY",
            client_secret:"XP0E2U5XYMZP0JQWKF0GMRWL0M04O4Z5EEIJAA5XE1JCBBRL",
            ll:this.state.latlong,
            query:food,
            limit:100,
            v:"20181709"
    
        };
        axios.get(endPoint+ new URLSearchParams(params)).then(response=>{
            console.log(response);
            this.setState({venues:response.data.response.groups[0].items})
            
        });

    }
    render(){
        return(
            <div className="addEventContainer">
            <Search getVenues={this.getVenues}></Search>
                <div className="RestaurantsContainer">{this.state.venues.map(venue=>{
                return (
                <div onClick={this.handleTimer }  className="RestaurantsList">  
                    <img className="placeholder" src={placeholder}/>   
                    <div className="TextStyle">
                    <div className="RestaurantStyle" key={venue.venue.name}>
                        {venue.venue.name}</div>
                     <div className="LocationStyle">{venue.venue.location.address}</div> 
                     </div>
                </div>)
            })}
            </div> 
                <div className="event__clock">
                
                <Timeset
                     handleVisibility = {this.handleTimer}
                    divdisplay={this.state.clickTimerButton}
                 />
                <div className="addEventContainer__search">
                   
                </div>
               {/* <button onClick={this.handleTimer }>Click here</button> */}
            </div>
            </div>
        );
    }
}