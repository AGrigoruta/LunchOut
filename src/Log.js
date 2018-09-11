import React from 'react';
import './css/index.css';
import icon from './view/images/FB_Icon.png';
import googic from './view/images/GPlus_Icon.png';


export default class Button extends React.Component{
    render(){
        return (
            <div className="container">  
                <div className="raw">
                    <div className = "main">
                    <a className="main__link" href="auth/facebook">
                        <div className = "main__log facebook">
                        <img src={icon} className="main__logo__icon" alt="logo" />
                            <p className="main__log__text">Login with Facebook</p>
                        </div></a>
                    </div>
                    
                </div>
                <div className="raw">
                    <div className = "main">
                    <a className="main__link" href="auth/google">
                        <div className = "main__log google">
                        <img src={googic} className="main__logo__icon" alt="logo" />
                            <p className="main__log__text">Login with Google</p>
                        </div></a>
                    </div>
                </div>
            </div>      
            
        );
    }
}