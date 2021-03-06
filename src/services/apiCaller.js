import axios from "axios";

/**
 * API caller common function
 * @param {Object} apiOptions - common api caller.
 * @param {string} apiOptions[].method - GET POST PUT DELETE.
 * @param {string} apiOptions[].url - url for api call.
 * @param {Object} apiOptions[].data - request data for api call.
 * @param {string} apiOptions[].authorized - authorization for api call.
 * @param {string} apiOptions[].headers - headers for api call.

 */

const apiCaller = ({
  method,
  url,
  data = null,
  authorized = false,
  headers = {
    "Content-Type": "application/json",
  },
}) => {
  let options = {
    method,
    url: url,
    crossDomain: true,
    headers,
  };

  if (authorized) {
    options.headers.authorization = localStorage.getItem("authorization");
  }

  if (data) {
    options.data = data;
  }

  //axios.defaults.withCredentials = true;
  return axios(options).catch(function (error) {
    if (error.response) {
      throw new Error(error);
    }
  });
};

export default apiCaller;
