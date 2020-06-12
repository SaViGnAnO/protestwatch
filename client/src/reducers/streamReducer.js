import { v4 as uuid } from 'uuid';
import { GET_STREAMS, ADD_STREAM, DELETE_STREAM, STREAMS_LOADING } from '../actions/types';

const initialState = {
    streams: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STREAMS:
            return {
                ...state,
                streams: action.payload,
                loading: false
            };
        case DELETE_STREAM:
            return {
                ...state,
                streams: state.streams.filter(stream => stream._id !== action.payload)
            };
        case ADD_STREAM:
            return {
                ...state,
                streams: [action.payload, ...state.streams]
            };
        case STREAMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}