import {SAVE_QUERY_PARAMS, SAVE_RESULTS} from '../constants/actionConstants'

export const saveQueryParamsOnLaunchAction = (params) => {
    return {
        type : SAVE_QUERY_PARAMS,
        payload : params
    }
}


export const saveResultsAction = (params) => {
    return {
        type : SAVE_RESULTS,
        payload : params
    }
}
