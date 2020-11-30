import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { TYPES } from '../types/types';

// Async Actions

export const eventStartAddNew = (event) => async (dispatch, getState) => {
    const { name } = getState().auth;
    try {
        const resp = await fetchWithToken('events', event, 'POST');
        const body = await resp.json();
        if (body.ok) {
            event.id = body.event.id;
            event.user = {
                _id: body.event.user,
                name,
            };
            dispatch(eventAddNew(event));
        }
    } catch (err) {
        Swal.fire('Error', err.message, 'error');
    }
};

export const eventStartLoadingEvents = () => async (dispatch) => {
    try {
        const resp = await fetchWithToken('events');
        const body = await resp.json();
        if (body.ok) {
            dispatch(eventLoaded(prepareEvents(body.events)));
        }
    } catch (err) {
        Swal.fire('Error', err.message, 'error');
    }
};

// Sync Actions

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

export const eventLoaded = (events) => {
    return {
        type: TYPES.EVENT_LOADED,
        payload: events,
    };
};
