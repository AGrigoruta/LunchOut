import React from 'react';
import '../../../css/index.css';
import Header from '../../header&footer/header';
import Footer from '../../header&footer/footer';

export default class EditEvent extends React.Component{
    constructor(props){
        super(props);
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