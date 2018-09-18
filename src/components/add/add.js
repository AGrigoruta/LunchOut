import React from 'react';
import axios from 'axios';
import Search from "../add/search.js"

export default class Add extends React.Component{

    constructor(props){
        super(props);

        this.state={
            latlong: "",
            venues:[]
        };
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
    
    getVenues=(query)=>{
        const endPoint="https://api.foursquare.com/v2/venues/explore?";
        const params={
            client_id:"EFSQIR4NPI5MRIF0DMGMF14COGKRFR4FWD3EXKXFTVP0TAKY",
            client_secret:"XP0E2U5XYMZP0JQWKF0GMRWL0M04O4Z5EEIJAA5XE1JCBBRL",
            ll:this.state.latlong,
            query:query,
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
        <div>
            <Search getVenues={this.getVenues}/>
           <ul>{this.state.venues.map(venue=>{
                return <li  key={venue.venue.name}>{venue.venue.name}<li>Location:{venue.venue.location.address}</li> </li>
            })}
            </ul> 
        </div>
        )
    }

}