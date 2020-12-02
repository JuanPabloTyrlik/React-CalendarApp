import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../CalendarModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
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

// jest.mock('../../../actions/events', () => ({
//     eventClearActive: jest.fn(),
//     eventStartLoadingEvents: jest.fn(),
// }));

// Storage.prototype.setItem = jest.fn();

describe('Tests on <CalendarModal />', () => {
    test('should render correctly', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
});
