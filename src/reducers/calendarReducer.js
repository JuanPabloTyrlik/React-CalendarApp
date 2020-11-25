import moment from 'moment';
import { TYPES } from '../types/types';

const initialState = {
    events: [
        {
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
        default:
            return state;
    }
};
