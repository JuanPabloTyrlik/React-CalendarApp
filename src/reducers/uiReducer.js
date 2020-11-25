import { TYPES } from '../types/types';

const initialState = {
    modalOpen: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.UI_OPEN_MODAL:
            return { ...state, modalOpen: true };
        case TYPES.UI_CLOSE_MODAL:
            return { ...state, modalOpen: false };
        default:
            return state;
    }
};
