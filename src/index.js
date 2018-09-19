import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import './css/index.css';
import App from './App';
import User from "./components/user"
import registerServiceWorker from './registerServiceWorker';
import Add from './components/add/add.js';
import newEvent from "./components/newEvent";


class Home extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div className="main__div">
                    <Route path="/" component={App} exact />
                    <Route path="/user" component={User}/>
                    <Route path="/add" component={newEvent}/>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
//registerServiceWorker();
