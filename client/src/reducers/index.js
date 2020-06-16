import { combineReducers } from 'redux';
import streamReducer from './streamReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


export default combineReducers({
    stream: streamReducer,
    error: errorReducer,
    auth: authReducer
});