import { uiReducer } from './uiReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    ui: uiReducer,
    // TODO: AuthReducer
    // TODO: CalendarReducer
});
