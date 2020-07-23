import React, { Component } from 'react'
import '../../assets/styles/style.css'

export class Filter extends Component {
    state={
        option1:false,
        option2:false
    }
    handleOpenOptions = () =>{
        this.setState({
            option1:!this.state.option1,
            option2:false
        })
    }
    handleOpenOptions1 = () =>{
        this.setState({
            option2:!this.state.option2,
            option1:false
        })
    }
    closeOption = () =>{
        this.setState({
            option2:false,
            option1:false
        })
    }

    
    componentDidMount (){
        window.addEventListener("click", event=>{
            if(this.state.option1  && !this.node.contains(event.target) || this.state.option2  && !this.node.contains(event.target)){
                this.setState({
                 option1:false,
                 option2:false
                })
            }
        })
    }
    
    render() {
        return (
            <div className="filter" ref={n =>(this.node = n)} >
               <div className="btn-1">
                <button className="filterbutton  dropdown-toggle" onClick={this.handleOpenOptions}>From Collections </button>
                {this.state.option1?<div className="dropdownvalue">
                  <p>Find content from your Collections.</p>
                  <lable>
                  <input  type="checkbox" value="hello"/>
                   Election 2020
                  </lable>
                  <lable>
                  <input type="checkbox" value="hello"/>
                   Election 2021
                  </lable>
                  <div className="button-group">
                     <button className="cancel" onClick={this.closeOption}>Cancel</button>
                     <button className="apply">Apply</button>
                  </div>
                   </div>:null
                }
              </div>
                <div className="btn-1">
                  <button className="filterbutton dropdown-toggle" onClick={this.handleOpenOptions1}>Suggested For </button>
                  {this.state.option2?<div className="dropdownvalue">
                  <p>Find content from your Collections.</p>
                  <lable>
                  <input  type="checkbox" value="hello"/>
                   Election 2020
                  </lable>
                  <lable>
                  <input type="checkbox" value="hello"/>
                   Election 2021
                  </lable>
                  <div className="button-group">
                     <button className="cancel" onClick={this.closeOption}>Cancel</button>
                     <button className="apply">Apply</button>
                  </div>
                   </div>:null
                }
                </div>
                <button className="filterbutton dropdown-toggle">Text Level </button>
                <button className="filterbutton dropdown-toggle">Language </button>
            </div>
        )
    }
}

export default Filter
