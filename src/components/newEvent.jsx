import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import '../css/index.css'; 
import {BrowserRouter, Route} from "react-router-dom";
import addEvent from "./events/addEvent";

export default class User extends React.Component{ 
    render(){
        return(
            <div className = "events__div"> 
                <Header name="Add Even" />
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