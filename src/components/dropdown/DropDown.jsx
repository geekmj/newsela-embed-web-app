import React, { Component } from 'react'
import '../../assets/styles/style.css'
class DropDown extends Component {
    state = {
        option: false,
        optionsdata: [
            
            { key: 'select', value: 'select' },
            { key: 'LtiLinkItem', value: 'Select as LTI link' },
            { key: 'smallThumbnail', value: 'Select as small thumbnail' },
            { key: 'largeThumbnail', value: 'Select as  large thumbnail' },
        ]
    }

    handleChange = (e) => {
        let value = this.state.optionsdata.filter(function (item) {
            return item.key == e.target.value
        })
        this.props.selectedType(value[0].key)
    }

    render() {
        return (
            <select onChange={this.handleChange}>
                {this.state.optionsdata.map(function (data, key) {
                    return (
                        <option key={key} value={data.key}>{data.value}</option>)
                })}
            </select>
        )
    }
}

export default DropDown