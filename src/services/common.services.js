import apiCaller from './apiCaller';

export const searchApi = (searchKeyword, pageNo) => {
    const reqObj = {};
    reqObj.url = `${process.env.REACT_APP_SEARCH_API_URL}?facets=true&format=full&objects=header&page=${pageNo}&page_size=12${searchKeyword}`;
    reqObj.method = 'get';
    return apiCaller(reqObj);
}
