import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import categories from './categories';
import games from './games';
import gamesPage from './gamesPage';
import gamePage from './gamePage';
import basket from './basket';

export default combineReducers({
    routing: routerReducer,
    games,
    gamesPage,
    gamePage,
    basket,
    categories
});