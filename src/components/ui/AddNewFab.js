import React from 'react';
import { useDispatch } from 'react-redux';
import { eventClearActive } from '../../actions/events';
import { uiModalOpen } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(eventClearActive());
        dispatch(uiModalOpen());
    };

    return (
        <button className="btn btn-primary fab" onClick={handleClick}>
            <i className="fas fa-plus"></i>
        </button>
    );
};
