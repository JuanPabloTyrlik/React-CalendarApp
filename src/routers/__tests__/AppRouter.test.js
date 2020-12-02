import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests on <AppRouter />', () => {
    test('should render "Loading..."', () => {
        const store = mockStore({
            auth: {
                checking: true,
                uid: '123',
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('should render Public Route', () => {
        const store = mockStore({
            auth: {
                checking: false,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });
    test('should render Private Route', () => {
        const store = mockStore({
            auth: {
                checking: false,
                uid: '123',
            },
            calendar: {
                events: [],
                activeEvent: null,
            },
            ui: {
                modalOpen: false,
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });
});
