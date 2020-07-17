import React, { Component } from 'react'
import '../../assets/styles/style.css'
import Suggestions from '../suggestions/suggestions'
class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            suggestions: [],
            searchKey: '',
            showSuggestions: false
        }

    }


    handleOnInputChange = (value) => {
        this.setState({
            searchKey: value,
            showSuggestions: true
        })
        this.props.updateValue('searchKey', value)
        this.searchWord(value)
    }

    filterBasedOnSearchKey = (searchKey) => {

        return this.props && this.props.jsonData && this.props.jsonData.length > 0 && this.props.jsonData.filter((value, index) => {
            return value.title.toLowerCase().includes(searchKey.toLowerCase())
        })
    }

    searchWord = (searchKey, type = '') => {

        // let filteredData = this.filterBasedOnSearchKey(searchKey);

        // this.setState({
        //     suggestions: filteredData,
        //     searchKey: searchKey
        // })
        // if (type == 'search') {
        //     this.props.filterData(filteredData)
        //     this.setState({
        //         showSuggestions: false
        //     })
        // }
        if (type == 'search') {
            this.props.searchAndSave()
        }
    }

    render() {
        const { query } = this.state
        return (
            <div className="container">
                <div className="searchmg">
                    <div className="searchbarsection">
                        <input type="text" value={this.state.searchKey} placeholder="What do you want to teach?" onChange={(e) => this.handleOnInputChange(e.target.value)} />
                        <button className="searchbutton" onClick={() => this.searchWord(this.state.searchKey, 'search')}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar