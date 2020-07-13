import React, { Component } from 'react'
import {connect} from 'react-redux'

import {checkNodeServer, callSearchAssessmentApis} from '../../services/common.services'
import {saveQueryParamsOnLaunchAction} from '../../actions/mainAction.js'
import Card from '../card'
import posts from "../../data.json"
class Main extends Component {
    state = {
        jsonData : posts
     }

    componentDidMount(){
        // throw new Error("An error has occured in component!");

        //Get query params from url
        this.props.saveQueryParamsOnLaunch(this.parseQuery(this.props.location.search));
        
        callSearchAssessmentApis().then((response) => {
            this.setState({
                message : response.map((value, index) => { return value.data})
            })
        })
    }

    parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }
    render() {

        return (<>
            <Card jsonData = {this.state.jsonData}/>
        </>)
    }
} 

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        saveQueryParamsOnLaunch : (params) => dispatch(saveQueryParamsOnLaunchAction(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
