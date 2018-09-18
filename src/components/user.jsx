import React from "react";
import Header from "./header/header";
import Footer from "./header/footer.js";
import Card from "./events/card.jsx";
import ContMenu from "./events/contextualmenu.jsx";
import '../css/index.css'; 
export default class User extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            toggleArrow: false,
        }

        this.callbackHandleArrow = this.callbackHandleArrow.bind(this);

    }

    callbackHandleArrow() {
        this.setState({
            toggleArrow: !this.state.toggleArrow
        })
    }
    
   
    render(){
        return(
            <div className = "events__div"> 
                <Header name="Dashboard" />
                <div className="main__card__component">
                <Card callbackFromParent={this.callbackHandleArrow}
                toggleArrow={ !this.state.toggleArrow }/>
                </div>
                <ContMenu 
                    toggleArrow={ this.state.toggleArrow }
                    callbackFromParent={this.callbackHandleArrow}
                />
                <Footer toggleArrow={ this.state.toggleArrow } />
            </div>


        );
    }
}