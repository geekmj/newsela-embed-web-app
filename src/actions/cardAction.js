import {SAVE_SELECTION, SELECTED_TYPE} from '../constants/actionConstants'

export const saveSelectionAction = (params) => {
    return {
        type : SAVE_SELECTION,
        payload : params
    }
}

export const selectedTypeAction = (params) => {
    return {
        type : SELECTED_TYPE,
        payload : params
    }
}

