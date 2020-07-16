import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseQuery, readCookie } from '../../utils/commonFunctions'
import { checkNodeServer, searchApi } from '../../services/common.services'
import { saveQueryParamsOnLaunchAction } from '../../actions/mainAction.js'
import {selectedTypeAction } from "../../actions/cardAction"
import Card from '../card'
import DropDown from '../dropdown'
import embedResType from '../../utils/embedResTypes'
class Main extends Component {
    state = {
        jsonData: []
    }

    componentDidMount() {
        // throw new Error("An error has occured in component!");

        //Get query params from url
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));

        searchApi().then((response) => {
            console.log("response", response)
            this.setState({
                jsonData: response.data.results
            })
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
   

    render() {

        return (<>
            {/* <DropDown  selectedType= {this.selectedType}/> */}
            <Card jsonData={this.state.jsonData} />
        </>)
    }
}

function mapStateToProps(state) {
    return {
        selectedResType: state.rootReducer.mainReducer.selectedType,
        selectedData: state.rootReducer.mainReducer.selectedData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveQueryParamsOnLaunch: (params) => dispatch(saveQueryParamsOnLaunchAction(params)),
        selectedType: (params) => dispatch(selectedTypeAction(params))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
