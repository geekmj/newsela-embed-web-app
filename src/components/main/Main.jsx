import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseQuery, readCookie } from '../../utils/commonFunctions'
import { searchApi } from '../../services/common.services'
import { saveQueryParamsOnLaunchAction, saveResultsAction } from '../../actions/mainAction.js'
import Card from '../card'
import Searchbar from '../searchbar';
import Loader from '../loader'
class Main extends Component {
    state = {
        jsonData: [],
        searchKey: '',
        currentPage: 0,
        isLoading: false
    }

    componentDidMount() {

        //Get query params from url
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));
        this.searchAndSave()
    }

    searchAndSave = (type = '') => {

        if ((type == 'search' && this.state.searchKey.trim()) || type != 'search') {

            let currentPage = 1

            this.setState({
                isLoading: true
            })

            if (type == 'loadMore') {
                currentPage = this.state.currentPage + 1
            }

            searchApi(this.state.searchKey, currentPage).then((response) => {
                let updatedJson
                if (type == 'loadMore') {
                    updatedJson = this.state.jsonData
                    updatedJson = [...updatedJson, ...response.data.results]
                } else {
                    updatedJson = response.data.results
                }

                this.setState({
                    jsonData: updatedJson,
                    currentPage: currentPage,
                    isLoading: false
                })
                this.props.saveResults(updatedJson)
            })
        }
    }

    updateValue = (key, value) => {

        if (key == 'searchKey') {
            this.setState({
                searchKey: value
            })
        }
    }

    loadMore = () => {
        this.searchAndSave('loadMore')
    }

    render() {

        return (<>
            <Searchbar searchAndSave={this.searchAndSave} updateValue={this.updateValue} jsonData={this.props.jsonData} />
            <Card isLoading={this.state.isLoading} jsonData={this.state.jsonData} />
            {this.state.jsonData && this.state.jsonData.length == 0 ? "" : <button className="load-more-button" onClick={() => this.loadMore()}>Show More Results</button>}
            {this.state.isLoading ? <Loader /> : ""}
        </>)
    }
}

function mapStateToProps(state) {
    return {
        jsonData: state.rootReducer.mainReducer.resultsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveQueryParamsOnLaunch: (params) => dispatch(saveQueryParamsOnLaunchAction(params)),
        saveResults: (params) => dispatch(saveResultsAction(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

