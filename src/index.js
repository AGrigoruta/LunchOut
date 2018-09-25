import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import './css/index.css';
import App from './App';
import User from "./components/user"
import registerServiceWorker from './registerServiceWorker';
import newEvent from "./components/newEvent";
import timeSet from "./components/events/timeset";
import EditEvent from './components/events/editEvent/editEvent';


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

class Home extends React.Component{

    constructor(props){
        super(props),
        this.state={
            
        }

    }

    render(){
        return(
            <BrowserRouter>
                <div className="main__div">
                    <Route path="/" component={App} exact />
                    <Route path="/user" component={User}/>
                    <Route path="/add" component={newEvent}/>
                    <Route path="/timer" component={timeSet} />
                    <Route path="/edit" component={EditEvent} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
//registerServiceWorker();
