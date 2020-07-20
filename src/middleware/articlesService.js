import api from '../services/api';
import  SEARCH_API_CONFIG  from '../config/appConfig';

const ArticlesService = {

    fetchAll : (pagingRequest) => {
        return async (dispatch, getState) => {
            try{
             const { API_SEARCH_ENDPOINT, API_DEFAULT_PARAM } =  SEARCH_API_CONFIG;
             const userAuth = await api.getData(API_SEARCH_ENDPOINT,API_DEFAULT_PARAM);
             dispatch({type : AUTH_USER, payload : userAuth.data.token});
            }catch(error){
             dispatch({type : AUTH_ERROR, payload : error});
            }
         };     
    },
    
    
};


export default ArticlesService;
