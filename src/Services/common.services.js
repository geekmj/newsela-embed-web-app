import apiCaller from './apiCaller'
import config from '../config'

import {CHECK_NODE_SERVER} from '../constants/apiEndpoints'

export function logError (error, info){
    console.log('Error logged...', error, info)
    //Hit api to log error on server
}

export function checkNodeServer(){

    let reqObj = {}
    reqObj.url = config.API_BASE_URL + CHECK_NODE_SERVER
    reqObj.method = 'get'
    reqObj.authorized = false

    return apiCaller(reqObj)
}