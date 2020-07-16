import React, { Component } from 'react'
import '../../assets/styles/style.css'
import axios from 'axios'
export class Searchbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            query:"",
            data:{}
        }
    }

    fetchSearchData = (query) =>{
      const url = ``
    }

    handleOnInputChange = (event) =>{
        const query = event.target.value;
        this.setState({
            query,
            data:{}
        })
    }
    
    render() {
        const {query} = this.state
        return (
            <div className="container">
            <div className="searchmg">
            <div className="searchbarsection">
            <input type="text" value={query} placeholder="What do you want to teach?" onChange={this.handleOnInputChange} /> 
            <button className="searchbutton">Search</button>
            </div>
            </div>
        
            </div>
        )
    }
}

export default Searchbar
