import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import './css/index.css';
import App from './App';
import User from "./components/user"
import registerServiceWorker from './registerServiceWorker';
import newEvent from "./components/newEvent";
import timeSet from "./components/events/timeset";

class Home extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div className="main__div">
                    <Route path="/" component={App} exact />
                    <Route path="/user" component={User}/>
                    <Route path="/add" component={newEvent}/>
                    <Route path="/timer" component={timeSet} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
//registerServiceWorker();
