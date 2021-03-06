import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.module.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/rootReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
}

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
    // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('signed_in', JSON.stringify(state.authentication.isAuthenticated));
    localStorage.setItem('quarters', JSON.stringify(state.quarters));
    localStorage.setItem('reports', JSON.stringify(state.reports));
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
