import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'

import reducers from './reducers';
import Layout from './containers/layout';
import Games from './containers/games';
import Game from './containers/game';
import Basket from './containers/basket';

import './index.css';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} basename={process.env.PUBLIC_URL}>
            <Route component={Layout}>
                <Route path='/' component={Games} />
                <Route path='/categories/:id' component={Games} />
            </Route>
            <Route path='/games/:id' component={Game} />
            <Route path='/basket' component={Basket} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

