import React, { Component } from 'react'
import '../../assets/styles/style.css'
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
    render() {
        return (
            <div className="dropdown">
                <button className="sendbutton dropdown-toggle" type="button" onClick={()=>this.handleClick()}>
                    Send
                </button>{
                    this.state.option?
                        <div className="send-dropdown" onClick= {(e)=>this.handleChange(e)}>
                            <a className="dropdown-item" selectedvalue="LtiLinkItem" value ="Send Link">Send Link</a>
                            <a className="dropdown-item" selectedvalue ="smallThumbnail" value ="Embed Small">Embed Small </a>
                            <a className="dropdown-item" selectedvalue= "mediumThumbnail" value ="Embed Medium">Embed Medium </a>
                            <a className="dropdown-item" selectedvalue ="largeThumbnail" value ="Embed Large"> Embed Large </a>
                        </div> : ""
                }

            </div>
        )
    }
}

export default DropDown
