import apiCaller from './apiCaller';
import { ASSIGNMENT } from '../constants/apiEndpoints';
import { SEARCH_API_URL, ASSIGNMENT_API_URL } from '../constants/urls'


export const searchApi = (searchKeyword, pageNo) => {

    const reqObj = {}
    reqObj.url = `${SEARCH_API_URL}?facets=true&format=full&objects=header&page=${pageNo}&page_size=20&needle=${searchKeyword}`
    reqObj.method = 'get'

    return apiCaller(reqObj)
}

export const assignmentApi = (searchKeyword) => {

    const reqObj = {}
    reqObj.url = ASSIGNMENT_API_URL + ASSIGNMENT
    reqObj.method = 'get'
    return apiCaller(reqObj)
}
