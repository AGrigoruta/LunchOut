import React from 'react';
import "../../../css/index.css";
import Search from "../../events/search.js";
import axios from 'axios';

import placeholder from "../../../view/images/placeholder.png"
import "../../../sass/main/events/user.scss";




export default class LocationEdit extends React.Component{
    constructor(props){
        super(props)
        this.state ={
                latlong: "",
                venues: [],
                venue: ""
        }}  setVenue(res){
            this.setState({
                venue: res
            })
        }
        componentDidMount() {
            this.getLocation();
        }
        getLocation = () => {
            navigator.geolocation.getCurrentPosition(response => {
                this.setState({
                    latlong: response.coords.latitude + "," + response.coords.longitude
                }, () => {
                    this.getVenues("")
                });
            });
        };
    
        getVenues = (query) => {
            const endPoint = "https://api.foursquare.com/v2/venues/explore?";
            const params = {
                client_id: "EFSQIR4NPI5MRIF0DMGMF14COGKRFR4FWD3EXKXFTVP0TAKY",
                client_secret: "XP0E2U5XYMZP0JQWKF0GMRWL0M04O4Z5EEIJAA5XE1JCBBRL",
                ll: this.state.latlong,
                query: query,
                limit: 100,
                v: "20181709"
    
            };
            axios.get(endPoint + new URLSearchParams(params)).then(res => {
    
                let restaurant = Object.assign([]);
                let stateBackup = Object.assign([], this.state);
                res.data.response.groups[0].items.map(element => {
                    console.log(element.venue.categories[0].id);
                    if (element.venue.categories[0].id.includes("4bf58dd8d48988d1")) {
    
    
                        // console.log(element.venue.categories[0].id );
                        restaurant.push(element);
                    }
                })
                console.log(restaurant);
                stateBackup.venues = restaurant;
                this.setState(stateBackup);
    
            });
    
        }

        render(){
            return(
       
            <div className="addEventContainer">
            {
                this.props.visibility ? (
                    <div>
                <Search getVenues={this.getVenues} />
                    <div className="RestaurantsContainer">{this.state.venues.map(venue => {
                        return (
                            <div onClick={()=> {
                                let payload = {
                                    location: venue.venue.name
                                }
                                this.state.venue=venue.venue.name
                                axios.put(`http://localhost:8080/api/event/${this.props.id}`, payload).then((resp)=> {
                                    console.log(resp);
                                    this.props.handleLocationVisibility;
                                })
                                }} className="RestaurantsList"  >
                                <img className="placeholder" src={placeholder} />
                                <div className="TextStyle">
                                    <div className="RestaurantStyle" key={venue.venue.name}>
                                        {venue.venue.name}</div>
                                    <div className="LocationStyle">{venue.venue.location.address}</div>
                                </div>
                            </div>)
                    
                    })}
                </div> </div>) : " "}
            </div>

);
        }
}