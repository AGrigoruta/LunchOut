import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import NoEvents from "./events/noEvents.jsx"
import '../css/index.css'; 
export default class User extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleArrow:false,
            isLoading: true,
            contacts: []
        }
        this.callbackHandleArrow = this.callbackHandleArrow.bind(this);
    }

    callbackHandleArrow(dataFromChildren){
        this.setState({
            toggleArrow: !this.state.toggleArrow
        })
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

        fetch('https://localhost:8080/api/event')
        .then(response =>response.json())
        .then(parsedJSON => parsedJSON.map(user =>({
           
            name: `${user.schemaId}`,
            location: `${user.location}`,
            startTime : `${user.startTime}`
        })))
        .then(contacts => this.setState({
            contacts,
            isLoading: true
        }))
        .catch(error => console.log('parsing failed', error))


    }

    render(){
        const {isLoading,contacts} = this.state;
        return(
            <div className = "events__div"> 
                <Header name="Dashboard" />
                <div className="main__card__component">
                {
                     isLoading && contacts.length > 0 ? contacts.map(contact =>{
                         const { name, location, startTime} = contact
                         return  <Card location={location} time={startTime} callbackFromParent={this.callbackHandleArrow}
                         toggleArrow={ !this.state.toggleArrow }/>
                         
                     }) : <NoEvents />
                }
                </div>
                <ContMenu 
                toggleArrow={ this.state.toggleArrow }
                callbackFromParent={this.callbackHandleArrow}
                />
                <Footer toggleArrow={ !this.state.toggleArrow } />
            </div>


        );
    }
}