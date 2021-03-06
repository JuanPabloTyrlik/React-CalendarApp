import { TYPES } from '../types/types';

const initialState = {
    checking: true,
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.AUTH_LOGIN:
            return {
                ...state,
                ...payload,
                checking: false,
            };
        case TYPES.AUTH_LOGOUT:
            return { checking: false };
        case TYPES.AUTH_CHECKING_FINISH:
            return {
                ...state,
                checking: false,
            };
        default:
            return state;
    }
};
