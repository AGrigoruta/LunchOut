import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import "../../css/index.css";

export default class notcard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div className="not_container">
                <div className="not_title">
                    {this.props.value.title}
                    <div className="not_body">
                        &nbsp;{this.props.value.body}
                    </div>
                </div>
                <div className="not_date">{this.props.value.date}</div>
            </div>
        );
    }
}
