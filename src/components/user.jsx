import React from "react";
import Header from "./header&footer/header";
import Footer from "./header&footer/footer.js";
import Card from "./events/card.jsx";
import axios from 'axios';
import ContMenu from "./events/contextualmenu.jsx";
import NoEvents from "./events/noEvents.jsx"
import DeleteEvent from "./events/deleteEvent.jsx"
import ViewEvent from "./events/ViewEvent.jsx"
import '../css/index.css';
export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleArrow: false,
            toggleDelete: false,
            isLoading: true,
            contacts: [],
            profileID: ""
        }
        this.callbackHandleArrow = this.callbackHandleArrow.bind(this);
        this.callbackHandleDelete = this.callbackHandleDelete.bind(this);
    }

    callbackHandleArrow(dataFromChildren) {
        this.setState({
            toggleArrow: !this.state.toggleArrow
        })
    }
    callbackHandleDelete(dataFromChildren) {
        this.setState({
            //toggleArrow: !this.state.toggleArrow,
            toggleDelete: !this.state.toggleDelete
        })
        console.log("Delete o.o");
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {

        fetch('https://localhost:8080/api/event')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.map((user) => {


                return {
                    name: `${user.schemaId}`,
                    location: `${user.location}`,
                    startTime: `${user.startTime}`,
                    participantsID: user.participantsID,
                    photo: [],
                    creatorId: user.creatorID
                };
            }))
            .then(contacts => this.setState({
                contacts,
                isLoading: true
            })).then((re) => {

                // let photosBackup = []
                this.state.contacts.forEach((element, i) => {
                    let imagesBackup = Object.assign([], element.photo);
                    for (var index = 0; index < element.participantsID.length; index++) {

                        fetch('https://localhost:8080/api/user/' + element.participantsID[index])
                            .then(res => res.json())
                            .then(pars => {
                                let stateBackup = Object.assign({}, this.state);

                                imagesBackup.push(pars.thumbnail);
                                // element.photo.push(pars.thumbnail);

                                stateBackup.contacts[i].photo = imagesBackup;
                                this.setState(stateBackup)
                                // console.log(stateBackup);
                            })

                    }

                })
            }
            ).catch(error => console.log('parsing failed', error))
    }

    fetchuser() {
        axios.get("https://localhost:8080/auth/logged")
            .then(res => {
                this.setState({
                    profileID: res.data.user.authId
                })
            })
    }

    render() {
        this.fetchuser();
        const { isLoading, contacts, profileID, creatorId } = this.state;
        return (
            <div className="events__div">
                <Header name="Opened Events" />
                <div className="main__card__component">
                    {
                        isLoading && contacts.length > 0 ? contacts.map(contact => {
                            const { location, startTime, photo , creatorId} = contact
                            
                            return <Card location={location} time={startTime} photo={photo} creatorId={creatorId} userId={this.state.profileID} callbackFromParent={this.callbackHandleArrow}
                                toggleArrow={!this.state.toggleArrow} />

                        }) : <NoEvents />
                    }
                    <DeleteEvent
                        toggleDelete={this.state.toggleDelete}
                        callbackFromParentDelete={this.callbackHandleDelete}
                    />
                    {//<ViewEvent />
                    }
                </div>

                <ContMenu
                    creatorId={creatorId}
                    userId={profileID}
                    toggleArrow={this.state.toggleArrow}
                    callbackFromParent={this.callbackHandleArrow}
                    toggleDelete={this.state.toggleDelete}
                    callbackFromParentDelete={this.callbackHandleDelete}

                />

                <Footer toggleArrow={this.state.toggleArrow} />
            </div>


        );
    }
}