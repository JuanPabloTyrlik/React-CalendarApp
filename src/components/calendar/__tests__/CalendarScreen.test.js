import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { TYPES } from '../../../types/types';
import { act } from '@testing-library/react';
import { eventClearActive } from '../../../actions/events';

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
        modalOpen: false,
    },
});
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

jest.mock('../../../actions/events', () => ({
    eventClearActive: jest.fn(),
    eventStartLoadingEvents: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

describe('Tests on <CalendarScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('interactions should work properly', () => {
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: TYPES.UI_OPEN_MODAL,
            payload: null,
        });

        calendar.prop('onSelectSlot')();
        expect(eventClearActive).toHaveBeenCalled();

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'lastView',
                'week'
            );
        });
    });
});
