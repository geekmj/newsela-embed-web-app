import React, { Component } from 'react'
import './DropDown.css'
class DropDown extends Component {
    state = {
        option: false
    }

    handleChange = (e) => {
       let value= e.target.getAttribute("selectedvalue")

        this.props.selectedType(value, this.props.itemData)

        this.setState({
            option:!this.state.option
        })
    }

    handleClick = () =>{
        this.setState({
            option:!this.state.option
        })
    }

    componentDidMount (){
        window.addEventListener("click", event=>{
            if(this.state.option && !this.node.contains(event.target)){
                this.setState({
                 option:false
                })
            }
        })
    }
   
    render() {
        return (
            <div className="dropdown" ref={n =>(this.node = n)}>
                <button className="sendbutton dropdown-toggle" type="button" onClick={()=>this.handleClick()}>
                    Embed
                </button>{
                    this.state.option?
                        <div className="send-dropdown" onClick= {(e)=>this.handleChange(e)}>
                            <a className="dropdown-item" href="#1" selectedvalue="LtiLinkItem" value ="Send Link">Link</a>
                            <a className="dropdown-item" href="#2" selectedvalue ="smallThumbnail" value ="Embed Small">Small </a>
                            <a className="dropdown-item" href="#3" selectedvalue= "mediumThumbnail" value ="Embed Medium">Medium </a>
                            <a className="dropdown-item" href="#4" selectedvalue ="largeThumbnail" value ="Embed Large">Large </a>
                        </div> : ""
                }

            </div>
        )
    }
}

export default DropDown
