import React, { Component } from 'react'
import {checkNodeServer} from '../../services/common.services'

export default class Demo extends Component {
    state = { }

    componentDidMount(){
        // throw new Error("An error has occured in component!");

        checkNodeServer().then((result) =>{
            
            this.setState({
                message : result.data.data
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
