import React, { Component } from 'react'

class Checkbox extends Component {
    state={
        check:false
    }

    handleChange=(event)=>{
     this.setState({
         check:event.target.checked
     })
    }
    render() {
        return (
            <div>
                <input type="checkbox" check={this.state.check} onchange={this.handleChange} />
            </div>
        )
    }
}

export default Checkbox

