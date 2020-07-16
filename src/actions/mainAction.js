import {SAVE_QUERY_PARAMS} from '../constants/actionConstants'

export const saveQueryParamsOnLaunchAction = (params) => {
    return {
        type : SAVE_QUERY_PARAMS,
        payload : params
    }
}