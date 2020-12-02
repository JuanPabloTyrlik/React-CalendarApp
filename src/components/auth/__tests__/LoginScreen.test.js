import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginScreen } from '../LoginScreen';
import { act } from '@testing-library/react';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});
store.dispatch = jest.fn();
jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);

describe('Tests on <LoginScreen />', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should log an user', async () => {
        const { email, password } = JSON.parse(
            process.env.REACT_APP_API_TEST_USER
        );
        wrapper.find('input[name="Lemail"]').simulate('change', {
            target: {
                name: 'Lemail',
                value: email,
            },
        });
        wrapper.find('input[name="Lpassword"]').simulate('change', {
            target: {
                name: 'Lpassword',
                value: password,
            },
        });
        act(() => {
            wrapper.find('form').at(0).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(store.dispatch).toHaveBeenCalled();
        expect(startLogin).toHaveBeenCalledWith(email, password);
    });
    test('should show error messages and register once resolved', async () => {
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            'Name cannot be empty',
            'error'
        );
        wrapper.find('input[name="Rname"]').simulate('change', {
            target: {
                name: 'Rname',
                value: 'TestUser',
            },
        });
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            'Email must be valid',
            'error'
        );
        wrapper.find('input[name="Remail"]').simulate('change', {
            target: {
                name: 'Remail',
                value: 'valid@email.com',
            },
        });
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            'Password cannot be empty',
            'error'
        );
        wrapper.find('input[name="Rpassword"]').simulate('change', {
            target: {
                name: 'Rpassword',
                value: 'ThisIs-A-Password-1',
            },
        });
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            "Passwords don't match",
            'error'
        );
        wrapper.find('input[name="Rpassword2"]').simulate('change', {
            target: {
                name: 'Rpassword2',
                value: 'ThisIs-A-Password-1',
            },
        });
        act(() => {
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault() {},
            });
        });
        expect(store.dispatch).toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith(
            'TestUser',
            'valid@email.com',
            'ThisIs-A-Password-1'
        );
    });
});
