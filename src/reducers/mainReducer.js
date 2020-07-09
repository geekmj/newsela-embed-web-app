import { SAVE_QUERY_PARAMS } from '../constants/actionConstants'

const INITIAL_STATE = {
    queryParams: null
}

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.payload
            }
        default:
            return {...state}
    }
}

export default mainReducer;