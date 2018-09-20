import React from 'react';
import bin from '../../view/images/trash-can.png';

export default class DeleteEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [
                {
                    location: 'Beer Platz',
                }
            ]
        }
    }
    render() {
        return (
            <div className="DeleteStuff">
                {
                    this.props.toggleDelete ? (
                        <div className="DeleteEvent">
                <div className="DeleteEventContainer">
                    <img src={bin} className="DeleteLogo" />
                    <p className="DeleteEventText">Are you sure you want to delete "Tribeca"</p>
                    <div className="buttons">
                        <div className="button-background">
                            <p className="Yes">Yes</p>
                        </div>
                        <div className="button-background" onClick={this.props.callbackFromParentDelete}>
                            <p className="No">No</p>
                        </div>
                    </div>
                </div>
            </div>
                    ) : ''
                }
            </div>
        )
    }
}
