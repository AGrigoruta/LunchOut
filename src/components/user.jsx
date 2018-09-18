import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import NoEvents from "./events/noEvents.jsx";

export default class User extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            contacts: []
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

        fetch('https://randomuser.me/api/?results=4&nat=us')
        .then(response =>response.json())
        .then(parsedJSON => parsedJSON.results.map(user =>({
           
            name: `${user.name.first} ${user.name.last}`,
            username: `${user.login.username}`,
            location: `${user.location.street}, ${user.location.city}`
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
                    isLoading && contacts.length > 0 ? (<NoEvents/>) : ''
                }
                </div>
                <ContMenu />
                <Footer />
            </div>


        );
    }
}