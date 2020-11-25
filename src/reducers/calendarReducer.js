import moment from 'moment';
import { TYPES } from '../types/types';

const initialState = {
    events: [
        {
            id: new Date().getTime(),
            title: 'Cumpleaños del jefe',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            notes: 'Comprar torta',
            user: {
                name: 'Juan Pablo',
            },
        },
    ],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.EVENT_ADD_NEW:
            return {
                ...state,
                events: [...state.events, payload],
            };
        case TYPES.EVENT_SET_ACTIVE:
            return {
                ...state,
                activeEvent: payload,
            };
        case TYPES.EVENT_CLEAR_ACTIVE:
            return {
                ...state,
                activeEvent: null,
            };
        case TYPES.EVENT_UPDATED:
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === payload.id ? payload : event
                ),
            };
        case TYPES.EVENT_DELETED:
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };
        default:
            return state;
    }
};
