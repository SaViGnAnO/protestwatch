import { GET_STREAMS, ADD_STREAM, DELETE_STREAM, STREAMS_LOADING } from './types';
import axios from 'axios';
const config = require('../config');

export const getStreams = () => dispatch => {
    dispatch(setStreamsLoading());
    axios.get(`${config.BASE_URL}/api/streams`)
        .then(res => dispatch({
            type: GET_STREAMS,
            payload: res.data
        }));
}

export const addStream = (stream) => dispatch => {
    axios.post(`${config.BASE_URL}/api/streams`, stream)
        .then(res => dispatch({
            type: ADD_STREAM,
            payload: res.data
        }));
}

export const deleteStream = (id) => dispatch => {
    axios.delete(`${config.BASE_URL}/api/streams/${id}`)
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