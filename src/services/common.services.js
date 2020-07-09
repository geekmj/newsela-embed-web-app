import apiCaller from './apiCaller';
import {CHECK_NODE_SERVER, ASSIGNMENT} from '../constants/apiEndpoints';
import { SEARCH_API_URL, ASSIGNMENT_API_URL } from '../constants/urls'
import config from '../config';
import axios from 'axios';

export const checkNodeServer = () => {

    const reqObj = {};
    reqObj.url = config.API_BASE_URL + CHECK_NODE_SERVER
    reqObj.method = 'get';
    reqObj.authorized = false;

    return apiCaller(reqObj);

};

export const searchApi = (searchKeyword)=>{

    const reqObj={}
    reqObj.url = `${SEARCH_API_URL}?facets=true&format=full&objects=header&page=1&page_size=2&needle=memorial+day`
    reqObj.method = 'get'

    return apiCaller(reqObj)
}

export const assginmentApi = (searchKeyword) => {

    const reqObj = {}
    reqObj.url = ASSIGNMENT_API_URL + ASSIGNMENT
    reqObj.method = 'get'
    return apiCaller(reqObj)
}

export const callSearchAssessmentApis = () => {

    const reqObj = {}
    reqObj.url = `${SEARCH_API_URL}?facets=true&format=full&objects=header&page=1&page_size=2&needle=memorial+day`
    reqObj.method = 'get'

    let searchReq = apiCaller(reqObj)
    reqObj.url = ASSIGNMENT_API_URL + ASSIGNMENT

    let assignmentReq = apiCaller(reqObj)
    return axios.all([searchReq,assignmentReq])
}