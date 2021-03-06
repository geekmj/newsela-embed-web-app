import apiCaller from './apiCaller';

export const searchApi = (searchKeyword, pageNo,pageSize) => {
    const reqObj = {};
    reqObj.url = `${process.env.REACT_APP_SEARCH_API_URL}?facets=true&format=full&objects=header&page=${pageNo}&page_size=${pageSize}${searchKeyword}`;
    reqObj.method = 'get';
    return apiCaller(reqObj);
}


export const filterCollectionApi = ( ) => {
    const reqObj = {};
    reqObj.url = `${process.env.REACT_APP_COLLECTION_API}`; // https://newsela.com/api/v1/collection/"
    reqObj.method = 'get';
    return apiCaller(reqObj);
}
