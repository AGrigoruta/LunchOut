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
                    png: userPic
                },
                {
                    location: 'Beer Platz',
                    time: '13:00',
                    png: userPic
                },
                {
                    location: 'Beer Platz',
                    time: '13:00',
                    png: userPic
                },
                {
                    location: 'Beer Platz',
                    time: '13:00',
                    png: userPic
                },
                {
                    location: 'Beer Platz',
                    time: '13:00',
                    png: userPic
                },
            ]
        }

        

    }
   

    render() {
        return (
            <div className={this.props.toggleArrow ? "" : "app-content arrowOpacity"}>
                {
                    this.state.objects.map((item, index) => {
                        return (
                            <div key={index} className="Card">
                                <div className="CardRow">
                                    <div className="text">
                                        <p className="location">{item.location}</p>
                                        <p className="time">{item.time}</p>
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
