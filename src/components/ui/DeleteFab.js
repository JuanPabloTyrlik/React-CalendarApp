import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteFab = () => {
    const dispatch = useDispatch();
    const { activeEvent } = useSelector((state) => state.calendar);

    const handleDelete = () => {
        dispatch(eventStartDelete(activeEvent.id));
    };

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
        </button>
    );
};
