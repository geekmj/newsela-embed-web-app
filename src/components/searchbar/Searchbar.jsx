import React, { Component } from 'react'
import '../../assets/styles/style.css'
export class Searchbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            query:"",
            data:{}
        }
    }
    
    render() {
        const {query} = this.state
        return (
            <div className="container">
            <input type="text" value={query} placeholder="Search something...." /> 
            </div>
        )
    }
}

export default Searchbar
