import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseQuery, readCookie } from '../../utils/commonFunctions'
import { checkNodeServer, searchApi } from '../../services/common.services'
import { saveQueryParamsOnLaunchAction, saveResultsAction } from '../../actions/mainAction.js'
import { selectedTypeAction } from "../../actions/cardAction"
import Card from '../card'
import DropDown from '../dropdown'
import Searchbar from '../searchbar';
import embedResType from '../../utils/embedResTypes'
import Loader from '../loader'
class Main extends Component {
    state = {
        jsonData: [],
        searchKey: '',
        currentPage: 1,
        isLoading: false
    }

    componentDidMount() {
        // throw new Error("An error has occured in component!");

        //Get query params from url
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));
        this.searchAndSave()
    }

    searchAndSave = (type='') => {
        this.setState({
            isLoading: true
        })

        searchApi(this.state.searchKey, this.state.currentPage).then((response) => {
            let updatedJson
            if(type =='loadMore'){
                updatedJson = this.state.jsonData
                updatedJson = [...updatedJson, ...response.data.results]
            }else{
                updatedJson = response.data.results
            }
           
            this.setState({
                jsonData: updatedJson,//response.data.results,
                currentPage: this.state.currentPage + 1,
                isLoading: false
            })
            this.props.saveResults(updatedJson)
        })
    }

    prepareJson = (value) => {
        let selectedType = value//this.props.selectedResType;
        let selectedData = this.props.selectedData;
        let jsonData = embedResType[selectedType]

        switch (selectedType) {
            case 'LtiLinkItem':
                jsonData.title = selectedData.title
                break
            case 'smallThumbnail':
                jsonData.title = selectedData.title
                break
            case 'largeThumbnail':
                jsonData.title = selectedData.title
                break;
        }

        console.log('>>>>>>>', selectedData, selectedType, jsonData)
    }

    selectedType = (value) => {
        this.props.selectedType(value)
        this.prepareJson(value)
    }

    filterData = (data) => {
        this.setState({
            jsonData: data,
        })
    }

    updateValue = (key, value) => {

        if (key == 'searchKey') {
            this.setState({
                searchKey: value
            })
        } else if (key == 'currentPage') {
            this.setState({
                currentPage: value
            })
        }

    }

    loadMore = () => {
        this.searchAndSave('loadMore')
    }

    render() {

        return (<>
            {/* <DropDown  selectedType= {this.selectedType}/> */}
            <Searchbar searchAndSave = {this.searchAndSave} updateValue={this.updateValue} filterData={this.filterData} jsonData={this.props.jsonData} />
            <Card isLoading = {this.state.isLoading} jsonData={this.state.jsonData} />
            <button className="searchbutton" onClick={() => this.loadMore()}>Load More</button>
            {this.state.isLoading ? <Loader /> : ""}
        </>)
    }
}

function mapStateToProps(state) {
    return {
        selectedResType: state.rootReducer.mainReducer.selectedType,
        selectedData: state.rootReducer.mainReducer.selectedData,
        jsonData: state.rootReducer.mainReducer.resultsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveQueryParamsOnLaunch: (params) => dispatch(saveQueryParamsOnLaunchAction(params)),
        selectedType: (params) => dispatch(selectedTypeAction(params)),
        saveResults: (params) => dispatch(saveResultsAction(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
