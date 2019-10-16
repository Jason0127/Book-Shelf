import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Promismiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Rootuser from './reducer';
import Routes from './routes';


const createStoreWithMiddleware = applyMiddleware(Promismiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Rootuser)}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

