import React from 'react';


export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <p className="header__title">{this.props.name}</p>
            </div>

        );
    }
}
