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
        .then(parsedJSON => parsedJSON.map((user) =>{

           
            return {
                name: `${user.schemaId}`,
                location: `${user.location}`,
                startTime : `${user.startTime}`,
                participantsID : user.participantsID,
                photo: []
                
            };
        }))
        .then(contacts => this.setState({
            contacts,
            isLoading: true
        })).then((re) => {
        
        // let photosBackup = []
        this.state.contacts.forEach((element, i) => {
            for(var index=0;index<element.participantsID.length;index++ ){
                
                let imagesBackup = Object.assign([], element.photo);
                fetch('https://localhost:8080/api/user/'+element.participantsID[index])
                .then(res => res.json())
                .then(pars => {
                    
                    
                    
                    let stateBackup = Object.assign({}, this.state);
                    
                    imagesBackup.push(pars.thumbnail);
                    // element.photo.push(pars.thumbnail);
                    
                    stateBackup.contacts[i].photo = imagesBackup;
                    this.setState(stateBackup)
                    // console.log(stateBackup);
                 } )
                
            }
            
        })}
        ).catch(error => console.log('parsing failed', error))
    }
    
    
    
    render(){
        const {isLoading,contacts} = this.state;
        return(
            <div className = "events__div"> 
                <Header name="Dashboard" />
                <div className="main__card__component">
                {
                     isLoading && contacts.length > 0 ? contacts.map(contact =>{
                         const { location, startTime, photo} = contact
                         return  <Card location={location} time={startTime} photo={photo} callbackFromParent={this.callbackHandleArrow}
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