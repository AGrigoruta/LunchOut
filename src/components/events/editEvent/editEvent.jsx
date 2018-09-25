import React from 'react';
import '../../../css/index.css';
import Header from '../../header&footer/header';
import Footer from '../../header&footer/footer';

export default class EditEvent extends React.Component{
    constructor(props){
        super(props);
    }

    fetchEvent(){
         fetch('https://localhost:8080/api/event')
        .then(response =>response.json())
        .then(parsedJSON => parsedJSON.map((user) => {

           
            return {
                name: `${user.schemaId}`,
                location: `${user.location}`,
                startTime : `${user.startTime}`,
                participantsID : user.participantsID,
                photo: []
                
            };
        }))
    }
    render(){
        return(
            <div className="events__div">
                <Header name="Edit your event"/>
                    <div className="main__card__component" >

                    </div>
                <Footer />
            </div>

        );
    }
}