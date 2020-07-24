import apiCaller from './apiCaller';
import { SEARCH_API_URL } from '../constants/urls'


export const searchApi = (searchKeyword, pageNo) => {

    const reqObj = {}
    reqObj.url = `${SEARCH_API_URL}?facets=true&format=full&objects=header&page=${pageNo}&page_size=12&needle=${searchKeyword}`
    reqObj.method = 'get'

    return apiCaller(reqObj)
}

