import React from 'react';
export default class UserEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            objects: [
                {
                    location: 'Tribeca',
                    time: '12:00',
                    png: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2041628029229996&height=200&width=200&ext=1539846081&hash=AeQG29wRevjapn5n'
                }
            ]
        }
    }
   

    render() {
        const {location, time, photo, id} = this.props;
        return (
          
            <div>
                <div>{location}</div>
                <div>{time}</div>
                <div>{photo}</div> 
                <div>{id}</div>

            </div>
           

        );
    }
}
