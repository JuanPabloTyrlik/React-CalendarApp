import { TYPES } from '../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.AUTH_LOGIN:
            return {
                ...state,
                checking: false,
                ...payload,
            };

        default:
            return state;
    }
};
