import React from 'react';
import { mount } from 'enzyme';
import { DeleteFab } from '../DeleteFab';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    calendar: {
        activeEvent: {
            id: '123',
        },
    },
});
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteFab />
    </Provider>
);

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn(),
}));

describe('Tests on <DeleteFab />', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should delete the activeEvent', () => {
        wrapper.find('button').simulate('click');
        expect(store.dispatch).toHaveBeenCalled();
        expect(eventStartDelete).toHaveBeenCalledWith('123');
    });
});
