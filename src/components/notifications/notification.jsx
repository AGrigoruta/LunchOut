import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Notcard from "./not-card";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import "../../css/index.css";

import Header from "../header&footer/header";
import Footer from "../header&footer/footer";

export default class notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    token: "",
                    body:
                        "De ce nu primeste nimka ? Oare e ruta care trebuie ?",
                    title: "Robert",
                    date: "21.04.2019"
                },
                {
                    token: "",
                    body: "Nu da la fata te rog !",
                    title: "Grigi",
                    date: "21.04.2019"
                },
                {
                    token: "",
                    body: "De ce imi da 33 ?!",
                    title: "Grigi",
                    date: "21.04.2019"
                },
                {
                    token: "",
                    body: "Esti constient ca nu eu am facut backul nu ?",
                    title: "Alex",
                    date: "21.04.2019"
                }
            ]
        };
    }
    // componentDidMount() {
    //     fetch(
    //         "C:\\Users\\Ionut\\Desktop\\LunchOut\\src\\components\\notifications\\mockup.json"
    //     )
    //         .then(response => response.json())
    //         .then(data => this.setState({ data }))
    //         .then(console.log("Sucessfull", this.state.data));
    // }
    render() {
        return (
            <div className="notcontainer">
                <Header name="Notifications" />
                <div className="notifications">
                    {this.state.data.map((item, index) => {
                        return <Notcard key={index} value={item} />;
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}
