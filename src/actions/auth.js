import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../helpers/fetch';
import { TYPES } from '../types/types';

// Async Actions
export const startLogin = (email, password) => async (dispatch) => {
    const resp = await fetchWithoutToken(
        'auth/login',
        { email, password },
        'POST'
    );
    const body = await resp.json();
    if (body.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
            login({
                uid: body.uid,
                name: body.name,
            })
        );
    } else {
        Swal.fire('Error', body.message, 'error');
    }
};

export const startRegister = (name, email, password) => async (dispatch) => {
    const resp = await fetchWithoutToken(
        'auth/register',
        { name, email, password },
        'POST'
    );
    const body = await resp.json();
    if (body.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
            login({
                uid: body.uid,
                name: body.name,
            })
        );
    } else {
        Swal.fire('Error', body.message, 'error');
    }
};

// Sync Actions
export const login = (user) => {
    return {
        type: TYPES.AUTH_LOGIN,
        payload: user,
    };
};
