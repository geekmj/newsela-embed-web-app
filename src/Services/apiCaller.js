import axios from 'axios'

/**
 * API caller common function
 * @param {Object} apiOptions - common api caller.
 * @param {string} apiOptions[].method - GET POST PUT DELETE.
 * @param {string} apiOptions[].url - url for api call.
 * @param {string} apiOptions[].data - request data for api call.
 * @param {string} apiOptions[].authorized - authorization for api call.
 * @param {string} apiOptions[].headers - headers for api call.

 */

const apiCaller = ({
    method,
    url,
    data = null,
    authorized = true,
    headers = { 'Content-Type': 'application/json' },
}) => {

    let options = {
        method,
        url: url,
        crossDomain: true,
        headers
    }

    if (authorized) {
        options.headers.authorization = localStorage.getItem('authorization')
    }

    return axios(options)
        .catch(function (error) {
            if (error.response) {
               //console.log(error.response.data);
               //console.log(error.response.status);
                throw new Error(error)
            }
        });
}

export default apiCaller
