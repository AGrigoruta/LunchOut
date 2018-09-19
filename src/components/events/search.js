import React from 'react';
import searchEvent from "../../view/images/searchicon.png";


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
            // <div className="input-container">
            //     <input className="icon" type="image" src={searchEvent} onClick={this.props.getVenues.bind(null,this.state.searchInput)}/>
            //     <input className="searchInput"onChange={this.changeHandler} type="text" placeholder="search restaurant"
            //     venue name="searchInput" id="searchInput"/>
                
            // </div>
            <div class="input-container">
                <img className="icon" src={searchEvent} />
                <input class="input-field" type="text" placeholder="Search Restaurants"
                 onChange={this.changeHandler} venue name="searchInput" id="searchInput"
                 onKeyPress={this.props.getVenues.bind(null,this.state.searchInput)}
                 />
                </div>
        )
    }
}