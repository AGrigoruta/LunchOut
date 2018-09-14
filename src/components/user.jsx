import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
export default class User extends React.Component{
    render(){
        return(
            <div className = "events__div"> 
                <Header name="Dashboard" />
                <div className="main__card__component">
                <Card />
                </div>
                <ContMenu />
                <Footer />
            </div>


        );
    }
}