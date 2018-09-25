import React from 'react';
import bin from '../../view/images/trash-can.png';
import axios from 'axios';

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
                    <p className="DeleteEventText">Are you sure you want to delete {this.props.event}</p>
                    <div className="buttons">
                        <div className="button-background" onClick={()=>{
                            axios.delete("https://localhost:8080/api/event/"+this.props.id)
                            .then((resp) => {
                                this.props.callbackFromParentDelete(false);
                            })
                        }}>
                            <p className="Yes">Yes</p>
                        </div>
                        <div className="button-background" onClick={()=>{this.props.callbackFromParentDelete(true)}}>
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
