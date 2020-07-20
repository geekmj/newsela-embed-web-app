import { 
    FETCH_ARTICLES_DATA,FETCH_ARTICLES_FILTER
    ,SAVE_ARTICLES_FILTER_DATA,SELECT_FILTER_BY_USER_DATA } from '../constants/actionConstants';

export const fetchArticleAction = (requestData) => {
    return {
        type : SAVE_SELECTION,
        payload : FETCH_ARTICLES_DATA
    };
};

export const fetchArticleFilterAction = (requestData) => {
    return {
        type : SAVE_SELECTION,
        payload : FETCH_ARTICLES_FILTER
    };
};


export const saveArticleFilterAction = (requestData) => {
    return {
        type : SAVE_SELECTION,
        payload : SAVE_ARTICLES_FILTER_DATA
    };
};

export const saveArticleFilterByUserAction = (requestData) => {
    return {
        type : SAVE_SELECTION,
        payload : SELECT_FILTER_BY_USER_DATA
    };
};
