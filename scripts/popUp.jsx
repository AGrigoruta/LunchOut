class App extends React.Component {
    state = {
        //a javascript object
        objects: [
            {
                option: 'Edit Event',
            },
            {
                option: 'Delete Event',
            },
        ]
    }
    render() {
        return (
            <div className="popUp">
                <div className ="object">
                    {
                        this.state.objects.map((item, index) => {
                            return (
                                <div key={index} className="container">
                                    <p className="menuItems">{item.option}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="cancel-button">
                    <p className="cancel">Cancel</p>
                </div>    
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('menu'));