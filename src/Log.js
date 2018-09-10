import React from 'react';
import './css/index.css';
import icon from './view/images/FB_Icon.png';
import googic from './view/images/GPlus_Icon.png';


export default class Button extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="raw">
                    <div className="main">
                        <div className="main__log facebook">
                            <img src={icon} className="main__logo__icon" alt="logo" />
                            <p className="main__log__text">Login with Facebook</p>
                        </div>
                    </div>

                </div>
                <a href="/auth/google" target="_self">
                <div className="raw">
                    <div className="main">
                        <div className="main__log google">
                            <img src={googic} className="main__logo__icon" alt="logo" />
                            <p className="main__log__text">Login with Google</p>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        );
    }
}