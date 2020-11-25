import { TYPES } from '../types/types';

export const eventAddNew = (event) => {
    return {
        type: TYPES.EVENT_ADD_NEW,
        payload: event,
    };
};

export const eventSetActive = (event) => {
    return {
        type: TYPES.EVENT_SET_ACTIVE,
        payload: event,
    };
};

export const eventClearActive = () => {
    return {
        type: TYPES.EVENT_CLEAR_ACTIVE,
        payload: null,
    };
};

export const eventUpdated = (event) => {
    return {
        type: TYPES.EVENT_UPDATED,
        payload: event,
    };
};

export const eventDeleted = () => {
    return {
        type: TYPES.EVENT_DELETED,
        payload: null,
    };
};
