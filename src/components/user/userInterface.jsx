import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router';
import Header from "../header&footer/header";
import Footer from "../header&footer/footer.js";
import ProfilePage from '../user/profilePage';

import axios from 'axios';

export default class UserInterface extends Component{
    constructor(props){
        super(props);

        this.state = {
            userImg: null,
            userName: null,
            userBackground: null,
            userId: null,
            eventDate: null
        }
    }
    render(){
        return(
            
            <div>
               <Header name={this.state.title} />
                <ProfilePage />
               <Footer />
            </div>
        );
    }
}