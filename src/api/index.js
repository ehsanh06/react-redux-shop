import R from 'ramda';
import games from './mockGames';
import categories from './mockCategories';
import request from 'superagent';

export const fetchGames = async () => {
    const {body} = await request.get('http://www.mocky.io/v2/5b75622b2e00005c00536035');
    return body.games;
};

export const loadMoreGames = async ({offset}) => {
    return new Promise(resolve => {
        resolve(games);
    });
};

export const fetchGameById = async (id) => {
    return new Promise((resolve, reject) => {
        const game = R.find(R.propEq('id', id), games);
        resolve(game);
    });
};

export const fetchCategories = async () => {
    return new Promise((resolve) => {
        resolve(categories);
    });
};