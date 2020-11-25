import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import { applyMiddleware, compose, createStore } from 'redux';

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);