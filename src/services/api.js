import axios from 'axios';


const instance = axios.create({
    headers: {
        'content-type':'application/json',
    },
});
export default {
    getData: (API_ENDPOINT,REQUEST_PARAM) =>
    instance({
        'baseURL': API_ENDPOINT,
        'method':'GET',
        'params': REQUEST_PARAM,
    }),
    postData: (API_ENDPOINT,REQUEST_DATA) =>
    instance({
        'method': 'POST',
        'baseURL': API_ENDPOINT,
        'data': REQUEST_DATA
    })
}