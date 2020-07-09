import React, { Component } from 'react'
import {connect} from 'react-redux'

import {checkNodeServer, callSearchAssessmentApis} from '../../services/common.services'
import {saveQueryParamsOnLaunchAction} from '../../actions/mainAction.js'

class Main extends Component {
    state = { }

    componentDidMount(){
        // throw new Error("An error has occured in component!");

        //Get query params from url
        this.props.saveQueryParamsOnLaunch(this.props.location.search);
        
        callSearchAssessmentApis().then((response) => {
            this.setState({
                message : response.map((value, index) => { return value.data})
            })
        })
    }

    render() {

        return (<>
        Hello ,This is Demo component...
        Nodejs Server status : <div><pre>{JSON.stringify(this.state.message, null, 2) }</pre></div>
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
