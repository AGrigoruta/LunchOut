import React from 'react'

export default class Search extends React.Component {
   constructor(props){
       super(props);

       this.state = {
           searchInput:""
       }
   }
   changeHandler=(event)=>{
       this.setState({searchInput:event.target.value})
   }
    render(){
        return(
            <div>
                <input onChange={this.changeHandler} type="text" placeholder="search place"
                venue name="searchInput" id="searchInput"/>
                <button onClick={this.props.getVenues.bind(null,this.state.searchInput)}>Search</button>
            </div>
        )
    }
}