import { TYPES } from '../types/types';

export const uiModalOpen = () => {
    return {
        type: TYPES.UI_OPEN_MODAL,
        payload: null,
    };
};

export const uiModalClose = () => {
    return {
        type: TYPES.UI_CLOSE_MODAL,
        payload: null,
    };
};
