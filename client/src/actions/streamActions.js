import { GET_STREAMS, ADD_STREAM, DELETE_STREAM, STREAMS_LOADING } from './types';
import axios from 'axios';
const config = require('./config');

this.axios.defaults.baseURL = config.BASE_URL || "http://localhost:5000";

export const getStreams = () => dispatch => {
    dispatch(setStreamsLoading());
    axios.get('/api/streams')
        .then(res => dispatch({
            type: GET_STREAMS,
            payload: res.data
        }));
}

export const addStream = (stream) => dispatch => {
    axios.post('/api/streams', stream)
        .then(res => dispatch({
            type: ADD_STREAM,
            payload: res.data
        }));
}

export const deleteStream = (id) => dispatch => {
    axios.delete(`/api/streams/${id}`)
        .then(dispatch({
            type: DELETE_STREAM,
            payload: id
        }));
}

export const setStreamsLoading = () => {
    return {
        type: STREAMS_LOADING
    };
}