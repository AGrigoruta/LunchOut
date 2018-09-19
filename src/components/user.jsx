import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import NoEvents from "./events/noEvents.jsx"
import DeleteEvent from "./events/deleteEvent.jsx"
import '../css/index.css'; 
export default class User extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleArrow: false,
            toggleDelete: false,
            isLoading: true,
            contacts: []
        }
        this.callbackHandleArrow = this.callbackHandleArrow.bind(this);
        this.callbackHandleDelete = this.callbackHandleDelete.bind(this);
    }

    callbackHandleArrow(dataFromChildren) {
        this.setState({
            toggleArrow: !this.state.toggleArrow
        })
        console.log("Arraw");
    }

    callbackHandleDelete(dataFromChildren) {
        this.setState({
            //toggleArrow: !this.state.toggleArrow,
            toggleDelete: !this.state.toggleDelete
        })
        console.log("Delete o.o");
    }
	
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

        fetch('https://localhost:8080/api/event')
        .then(response =>response.json())
        .then(parsedJSON => parsedJSON.map(user =>({
           
            name: `${user.schemaId}`,
            username: `${user.startTime}`,
            location: `${user.location}`
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
                         return  <Card callbackFromParent={this.callbackHandleArrow}
                         toggleArrow={ !this.state.toggleArrow }/>
                         
                     }) : <NoEvents />
                }
                <DeleteEvent
                    toggleDelete={this.state.toggleDelete}
                    callbackFromParentDelete={this.callbackHandleDelete}
                />
                </div>
                <ContMenu
                    toggleArrow={this.state.toggleArrow}
                    callbackFromParent={this.callbackHandleArrow}
                    toggleDelete={this.state.toggleDelete}
                    callbackFromParentDelete={this.callbackHandleDelete}
                    
                />
                <Footer toggleArrow={ this.state.toggleArrow } toggleDelete={this.state.toggleDelete} />
            </div>


        );
    }
}