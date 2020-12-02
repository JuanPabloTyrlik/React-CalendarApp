import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { TYPES } from '../types/types';
import { eventClearAll } from './events';

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
        if (body.errors) {
            body.message = body.errors.reduce(
                (a, v) => (a += '' + v.msg + '<br/>'),
                ''
            );
        }
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
        if (body.errors) {
            body.message = body.errors.reduce(
                (a, v) => (a += '' + v.msg + '<br/>'),
                ''
            );
        }
        Swal.fire('Error', body.message, 'error');
    }
};

export const startChecking = () => async (dispatch) => {
    const resp = await fetchWithToken('auth/token');
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
        dispatch(checkingFinish());
    }
};

export const startLogout = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventClearAll());
};

// Sync Actions
export const login = (user) => {
    return {
        type: TYPES.AUTH_LOGIN,
        payload: user,
    };
};

export const logout = () => {
    return {
        type: TYPES.AUTH_LOGOUT,
        payload: null,
    };
};

export const checkingFinish = () => {
    return {
        type: TYPES.AUTH_CHECKING_FINISH,
        payload: null,
    };
};
