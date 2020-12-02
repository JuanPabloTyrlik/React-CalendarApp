import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { TYPES } from '../../types/types';
import { startLogin } from '../auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});

Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Tests on Auth Actions', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    test('startLogin should log an user', async () => {
        const { email, password } = JSON.parse(
            process.env.REACT_APP_API_TEST_USER
        );
        await store.dispatch(startLogin(email, password));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: TYPES.AUTH_LOGIN,
            payload: {
                uid: expect.any(String),
                name: 'Test User',
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token',
            expect.any(String)
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token-init-date',
            expect.any(Number)
        );
        // token = localStorage.setItem.mock.calls[0][1];
        // console.log(localStorage.setItem.mock.calls[0][1]);
    });
    test('startLogin should fail', async () => {
        await store.dispatch(
            startLogin('NotAnUser@email.com', 'NotAValidPassword1-')
        );
        const actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            'Invalid email or password',
            'error'
        );
    });
});
