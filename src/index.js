import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import User from "./components/user";
import newEvent from "./components/newEvent";
import timeSet from "./components/events/timeset";
import EditEvent from "./components/events/editEvent/editEvent";

const PrivateRoute = ({ component: Component, ...rest }) => {
    <Route
        {...rest}
        render={props =>
            axios.get("https://localhost:8080/auth/logged").then(res => {
                if (res.data.authenticated) {
                    <Component {...props} />;
                } else {
                    <Redirect to="/" />;
                }
            })
        }
    />;
};

class Home extends React.Component {
    constructor(props) {
        super(props), (this.state = {});
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main__div">
                    <Route path="/" component={App} exact />
                    <Route path="/user" component={User} />
                    <Route path="/add" component={newEvent} />
                    <Route path="/timer" component={timeSet} />
                    <Route path="/edit" component={EditEvent} />
                </div>
            </BrowserRouter>
        );
    }
}

if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("/service-worker.js").then(
        function(registration) {
            console.log("Service worker registration succeeded:", registration);
        },
        /*catch*/ function(error) {
            console.log("Service worker registration failed:", error);
        }
    );
} else {
    console.log("Service workers are not supported.");
}

ReactDOM.render(<Home />, document.getElementById("root"));
