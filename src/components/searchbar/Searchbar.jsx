import React, { Component } from 'react'
import './Searchbar.css'
class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchKey: ''
        }

    }

    handleOnInputChange = (e) => {
        this.setState({
            searchKey: e.target.value,
        })
        if(e.charCode === 13){ 
            this.searchWord()
        }
         this.props.updateValue('searchKey',e.target.value )
    }

    filterBasedOnSearchKey = (searchKey) => {

        return this.props && this.props.jsonData && this.props.jsonData.length > 0 && this.props.jsonData.filter((value, index) => {
            return value.title.toLowerCase().includes(searchKey.toLowerCase())
        })
    }

    searchWord = () => {
        this.props.searchAndSave('search')
    }

    render() {

        return (
            <div className="container">
                <div className="searchbarsection">
                    <input type="text" id= "search" maxLength="200" value={this.state.searchKey} placeholder="What do you want to teach?"
                        onKeyPress={(e) => this.handleOnInputChange(e)} onChange={(e) => this.handleOnInputChange(e)} />
                    <button className="searchbutton" onClick={() => this.searchWord()}>Search</button>
                </div>
            </div>
        )
    }
}

export default Searchbar