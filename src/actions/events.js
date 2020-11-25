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
