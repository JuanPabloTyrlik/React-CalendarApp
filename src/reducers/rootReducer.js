import { uiReducer } from './uiReducer';
import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    // TODO: AuthReducer
    calendar: calendarReducer,
});
