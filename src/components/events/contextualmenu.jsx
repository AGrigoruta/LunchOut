import React from 'react';

export default class ContMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="popUpp">
                <div className="popUp ">
                    {
                        (this.props.toggleArrow && !this.props.toggleDelete)? (
                            <div>
                                <div className="object">
                                    <div className="container">
                                        <p className="menuItems">Edit Event</p>
                                    </div>
                                    <div className="container" onClick={this.props.callbackFromParentDelete}>
                                        <p className="menuItems" >Delete Event</p>
                                    </div>
                                </div>
                                <div className="cancel-button" onClick={this.props.callbackFromParent}>
                                    <p className="cancel" >Cancel</p>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}
