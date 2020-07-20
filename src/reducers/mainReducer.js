import { SAVE_QUERY_PARAMS, SAVE_SELECTION, SELECTED_TYPE, SAVE_RESULTS } from '../constants/actionConstants'

const INITIAL_STATE = {
    queryParams: null,
    selectedData: null,
    selectedType: null,
    resultsData: null,
    selectArticles: null,
    selectArticlesFilters: null,
    selectFiltersByUser: null,
    
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.payload
            }
        case SAVE_SELECTION:
            return {
                ...state,
                selectedData: action.payload
            }
        case SELECTED_TYPE:
            return {
                ...state,
                selectedType: action.payload
            }
        case SAVE_RESULTS:
            return {
                ...state,
                resultsData: action.payload
            }
        default:
            return { ...state }
    }
}

export default mainReducer;