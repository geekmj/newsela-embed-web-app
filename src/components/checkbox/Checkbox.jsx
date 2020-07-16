import React, { Component } from 'react'

class Checkbox extends Component {
    state = {
        id: null
    }

    handleChange = (content) => {
        if (content.id) {
            this.setState({
                id: content.id
            })

            this.props.setSelectedContent(content)
        }
    }

    render() {
        return (
            <div>
                <input type="radio" name='checkbox' check={this.props.content.id == this.state.id} onChange={() => this.handleChange(this.props.content)} />       
            </div>
        )
    }
}

export default Checkbox;
