import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import axios from 'axios';
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import '../css/index.css'; 
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import addEvent from "./events/addEvent";


const PrivateRoute = ({component: Component, ...rest})=>{
    <Route {...rest} render={(props)=>(
         axios.get("https://localhost:8080/auth/logged")
         .then(res=>{
             if(res.data.authenticated){
                 <Component {...props}/>
             }else{
                 <Redirect to='/' />
             }
         })
    )}/>
}

export default class User extends React.Component{ 
    render(){
        return(
            <div className = "events__div"> 
                <Header name="Add Event" />
                    <div className="main__card__component">
                        <BrowserRouter>
                            <Route path="/add" component={addEvent} />
                        </BrowserRouter>
                        
                    </div>
                <Footer />
            </div>


        );
    }
}