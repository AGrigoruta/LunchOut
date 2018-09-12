class App extends React.Component {
    state = {
        //a javascript object
        objects: [
            {
                location: 'Tribeca',
                time: '12:00',
                png: 'user.png'
            },
            {
                location: 'Beer Platz',
                time: '13:00',
                png: 'user.png'
            },
        ]
    }
    // Update(a){
    //     let newState = Object.assign({}, this.state);
    //     newState.location = a;
    //     this.setState(newState);
    // }
    render() {
        return (
            <div className="app-content">
                {
                    this.state.objects.map((item, index) => {
                        return (
                            <div key={index} className="Card">
                                <div className="CardRow">
                                    <div className="text">
                                        <p className="location">{item.location}</p>
                                        <p className="time">{item.time}</p>
                                    </div>
                                    <div className="arrow-down"></div>
                                </div>
                                <div className="Images">
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
ReactDOM.render(<App />, document.getElementById('app'));