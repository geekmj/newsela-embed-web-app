import React, { Component } from 'react'
import '../../assets/styles/style.css'
class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchKey: '',
        }

    }


    handleOnInputChange = (value) => {
        this.setState({
            searchKey: value,
        })

        this.props.updateValue('searchKey', value)
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
                <div className="searchmg">
                    <div className="searchbarsection">
                        <input type="text" value={this.state.searchKey} placeholder="What do you want to teach?" onChange={(e) => this.handleOnInputChange(e.target.value)} />
                        <button className="searchbutton" onClick={() => this.searchWord()}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar
