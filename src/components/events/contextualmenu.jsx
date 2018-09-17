import React from 'react';

export default class ContMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            objects: [
                {
                    option: 'Edit Event',
                },
                {
                    option: 'Delete Event',
                },
            ]
        }
    }

    
    render() {
        return (
            <div className="popUp">
                <div className="popUp ">
               { 
                this.props.toggleArrow ? (
                    <div>
                        <div className="object">
                        {
                            this.state.objects.map((item, index) => {
                                return (
                                    <div key={index} className="container">
                                        <p className="menuItems">{item.option}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="cancel-button">
                            <p className="cancel" onClick={ this.props.callbackFromParent}>Cancel</p>
                        </div>
                    </div>
                ) : ''
               }
               </div>
            </div>
        );
    }
}
