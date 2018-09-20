import React from 'react';
export default class Card extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {

        //     arrowToggle: true,
        //     objects: [
        //         {
        //             location: 'Tribeca',
        //             time: '12:00',
        //             png: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2041628029229996&height=200&width=200&ext=1539846081&hash=AeQG29wRevjapn5n'
        //         }
        //     ]
        // }
    }
   

    render() {
        const {location, time, photo, callbackFromParent} = this.props;
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
                                   <div className="arrow-down" onClick={callbackFromParent} ></div> 
                                </div>
                                {photo.map(function(imageSrc) {
                                    return (
                                        <div key ={imageSrc}className="images">
                                        
                                            <img src={ imageSrc } />
                                        
                                         </div>
                                        );
                                    })}
                                   
                            </div>
                        )
                    })
                }
            </div>

        );
    }
}
