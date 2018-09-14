import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import './css/index.css';
import App from './App';
import Log from './Log';
import User from "./components/user"
import registerServiceWorker from './registerServiceWorker';



class Home extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div className="main__div">
                    <Route path="/" component={App} exact />
                    <Route path="/user" component={User}/>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
//registerServiceWorker();
