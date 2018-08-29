import {
    FETCH_GAMES_START, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE,
    LOAD_MORE_GAMES_START, LOAD_MORE_GAMES_SUCCESS, LOAD_MORE_GAMES_FAILURE,
    FETCH_GAME_BY_ID_START, FETCH_GAME_BY_ID_SUCCESS, FETCH_GAME_BY_ID_FAILURE,
    ADD_GAME_TO_BASKET, SEARCH_GAME, FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE, REMOVE_GAME_FROM_BASKET, CLEAN_BASKET
} from '../actionTypes';

import {
    fetchGames as fetchGamesApi, 
    loadMoreGames as loadMoreGamesApi,
    fetchGameById as fetchGameByIdApi,
    fetchCategories as fetchCategoriesApi
} from '../api';

import { getRenderedGamesLength } from '../selectors';

export const fetchGames = () => async dispatch => {
    dispatch({type: FETCH_GAMES_START});
    
    try {
        const games = await fetchGamesApi();
        dispatch({
            type: FETCH_GAMES_SUCCESS,
            payload: games
        });
    } catch (err) {
        dispatch({
            type: FETCH_GAMES_FAILURE,
            payload: err,
            error: true
        });
    }
};

export const loadMoreGames = () => async (dispatch, getState) => {
    const offset = getRenderedGamesLength(getState());

    dispatch({ type: LOAD_MORE_GAMES_START });

    try {
        const games = await loadMoreGamesApi({offset});
        dispatch({
            type: LOAD_MORE_GAMES_SUCCESS,
            payload: games
        })
    } catch (err) {
        dispatch({
            type: LOAD_MORE_GAMES_FAILURE,
            payload: err,
            error: true
        });
    }
};

export const fetchGameById = (id) => async dispatch => {
    dispatch({type: FETCH_GAME_BY_ID_START});

    try {
        const game = await fetchGameByIdApi(id);
        dispatch({
            type: FETCH_GAME_BY_ID_SUCCESS,
            payload: game
        });

    } catch(err) {
        dispatch({
            type: FETCH_GAME_BY_ID_FAILURE,
            payload: err,
            error: true
        });
    }
}

export const addGameToBasket = id => dispatch => {
    dispatch({
        type: ADD_GAME_TO_BASKET,
        payload: id
    });
}

export const searchGame = (text) => dispatch => {
    dispatch({
        type: SEARCH_GAME,
        payload: text
    });
}

export const fetchCategories = () => async dispatch => {
    dispatch({type: FETCH_CATEGORIES_START});

    try {
        const categories = await fetchCategoriesApi();
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: categories
        });
    } catch (err) {
        dispatch({
            type: FETCH_CATEGORIES_FAILURE,
            payload: err,
            error: true
        });
    }
};

export const removeGameFromBasket = id => async dispatch => {
    dispatch({
        type: REMOVE_GAME_FROM_BASKET,
        payload: id
    });
};

export const cleanBasket = () => dispatch => {
    dispatch({
        type: CLEAN_BASKET
    });
};

export const basketCheckout = games => () => {
    alert(JSON.stringify(games));
};