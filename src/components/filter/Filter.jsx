import React, { Component } from 'react'
import '../../assets/styles/style.css'

export class Filter extends Component {
    state={
        option:false
    }
    handleOpenOptions = () =>{
        this.setState({
            option:!this.state.option
        })
    }

    render() {
        return (
            <div className="filter">
                <button className="filterbutton  dropdown-toggle" onClick={this.handleOpenOptions}>From Collections </button>
                {this.state.option?<div className="dropdownvalue">
                  <p>Find content from your Collections.</p>
                  <lable>
                  <input  type="checkbox" value="hello"/>
                   Election 2020
                  </lable>
                  <lable>
                  <input type="checkbox" value="hello"/>
                   Election 2021
                  </lable>
                  <button>Cancel</button>
                  <button>Apply</button>
                </div>:null}
                <button className="filterbutton dropdown-toggle">Suggested For </button>
                <button className="filterbutton dropdown-toggle">Text Level </button>
                <button className="filterbutton dropdown-toggle">Language </button>
            </div>
        )
    }
}

export default Filter
