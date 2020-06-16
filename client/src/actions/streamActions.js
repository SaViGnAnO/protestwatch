import {
    GET_STREAMS,
    ADD_STREAM,
    DELETE_STREAM,
    STREAMS_LOADING,
} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
const config = require('../config');

export const getStreams = () => (dispatch) => {
    dispatch(setStreamsLoading());
    axios
        .get(`${config.BASE_URL}/api/streams`)
        .then((res) =>
            dispatch({
                type: GET_STREAMS,
                payload: res.data,
            })
        )
        .catch((error) =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const addStream = (stream) => (dispatch, getState) => {
    axios
        .post(`${config.BASE_URL}/api/streams`, stream, tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: ADD_STREAM,
                payload: res.data,
            })
        )
        .catch((error) =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const deleteStream = (id) => (dispatch, getState) => {
    axios
        .delete(`${config.BASE_URL}/api/streams/${id}`, tokenConfig(getState))
        .then(
            dispatch({
                type: DELETE_STREAM,
                payload: id,
            })
        )
        .catch((error) =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const setStreamsLoading = () => {
    return {
        type: STREAMS_LOADING,
    };
};
