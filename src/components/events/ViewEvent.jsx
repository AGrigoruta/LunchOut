import React from 'react';
import UserPic from '../../view/images/user.png'
import Maps from './map.js'

export default class ViewEvent extends React.Component {
    render() {
        return (
            <div className="view-event">
                <div className="Event-Data">
                    <div className="Name-And-Hour">
                        <p className="View-Location">Chef Gallery</p>
                        <p className="View-Hour">12:00</p>
                    </div>
                    <div className="Going-And-Nr">
                        <p className="Going-Text">Going</p>
                        <p className="Nr-Of-Ppl-Going">(3)</p>
                    </div>
                    <div className="Going-Users-List">
                        <div className="Event-User-Data">
                            <img src={UserPic} className="Going-User-Icon" />
                            <p className="Going-User-Name">Buza Ghiorghe</p>
                        </div>
                        <div className="Event-User-Data">
                            <img src={UserPic} className="Going-User-Icon" />
                            <p className="Going-User-Name">Buza Ghiorghe</p>
                        </div>
                        <div className="Event-User-Data">
                            <img src={UserPic} className="Going-User-Icon" />
                            <p className="Going-User-Name">Buza Ghiorghe</p>
                        </div>
                        <div className="Event-User-Data">
                            <img src={UserPic} className="Going-User-Icon" />
                            <p className="Going-User-Name">Buza Ghiorghe</p>
                        </div>
                    </div>
                </div>
                <div className="Button-border-Join">
                    <p className="Button-Join" > Join Event </p>
                </div>
                <Maps />
            </div>
        )
    }
}