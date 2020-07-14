import React, { Component } from 'react'
import {connect} from 'react-redux'
import {parseQuery,readCookie} from '../../utils/commonFunctions'
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
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));
        
        callSearchAssessmentApis().then((response) => {
            this.setState({
                message : response.map((value, index) => { return value.data})
            })
        })
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
