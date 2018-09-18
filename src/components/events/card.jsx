import React from 'react';
import userPic from '../../view/images/user.png';

export default class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            arrowToggle: true,
            objects: [
                {
                    location: 'Tribeca',
                    time: '12:00',
                    png: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2041628029229996&height=200&width=200&ext=1539802740&hash=AeQETHIncsgHM5D1'
                }
            ]
        }

        

    }
   

    render() {
        const {location, time} = this.props;
        return (
            <div className={this.props.toggleArrow ? "" : "app-content arrowOpacity"}>
                {
                    
                    this.state.objects.map((item, index) => {
                        return (
                            <div key={index} className="Card">
                                <div className="CardRow">
                                    
                                    <div className="text">
                                        <p className="location">{location}</p>
                                        <p className="time">{time}</p>
                                    </div>
                                   <div className="arrow-down" onClick={this.props.callbackFromParent} ></div> 
                                </div>
                                <div className="images">
                                    <img src={item.png}></img>
                                    <img src={item.png}></img>
                                    <img src={item.png}></img>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        );
    }
}
