import apiCaller from './apiCaller';
import {CHECK_NODE_SERVER} from '../constants/apiEndpoints';
import config from '../config';

export const checkNodeServer = () => {

    const reqObj = {};
    reqObj.url = config.API_BASE_URL + CHECK_NODE_SERVER
    reqObj.method = 'get';
    reqObj.authorized = false;

    return apiCaller(reqObj);

};
