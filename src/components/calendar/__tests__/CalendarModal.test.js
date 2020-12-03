import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../CalendarModal';
import {
    eventClearActive,
    eventStartAddNew,
    eventStartUpdate,
} from '../../../actions/events';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    auth: {
        checking: false,
        uid: '123',
    },
    calendar: {
        events: [
            {
                title: 'Fin del curso!',
                notes: '',
                start: '2020-11-30T22:00:00.257Z',
                end: '2020-11-30T23:00:00.257Z',
                user: {
                    _id: '5fc061f32522d13e84f5cf84',
                    name: 'Juan',
                },
                id: '5fc56c07f5cea618fcb58542',
            },
        ],
        activeEvent: {
            title: 'Fin del curso!',
            notes: '',
            start: '2020-11-30T22:00:00.257Z',
            end: '2020-11-30T23:00:00.257Z',
            user: {
                _id: '5fc061f32522d13e84f5cf84',
                name: 'Juan',
            },
            id: '5fc56c07f5cea618fcb58542',
        },
    },
    ui: {
        modalOpen: true,
    },
});
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventStartAddNew: jest.fn(),
    eventClearActive: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Tests on <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should render correctly', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
    test('should edit an event', () => {
        jest.useFakeTimers();
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });
        expect(eventStartUpdate).toHaveBeenCalledWith({
            title: 'Fin del curso!',
            notes: '',
            start: '2020-11-30T22:00:00.257Z',
            end: '2020-11-30T23:00:00.257Z',
            user: {
                _id: '5fc061f32522d13e84f5cf84',
                name: 'Juan',
            },
            id: '5fc56c07f5cea618fcb58542',
        });
        jest.runAllTimers();
        expect(eventClearActive).toHaveBeenCalled();
    });
    test('should show error messages', () => {
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
                modalOpen: true,
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error',
            'El evento debe tener un título',
            'error'
        );
        expect(wrapper.find('input[name="title"]').hasClass('is-valid')).toBe(
            false
        );
    });
    test('should create a new event', () => {
        jest.useFakeTimers();
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
                modalOpen: true,
            },
        });
        store.dispatch = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'NewEvent',
            },
        });
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });
        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.any(Date),
            start: expect.any(Date),
            title: 'NewEvent',
            notes: '',
        });
        jest.runAllTimers();
        expect(eventClearActive).toHaveBeenCalled();
    });
});
