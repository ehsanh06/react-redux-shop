import R from 'ramda';

export const getGameById = (state, id) => R.prop(id, state.games);

export const getGames = (state, ownProps) => {

    const activeCategoryId = getActiveCategoryId(ownProps);
    const applyCategory = item => R.equals(
        activeCategoryId,
        R.prop('categoryId', item)
    );

    const applySearch = item => R.contains(
        state.gamesPage.search,
        R.prop('name', item)
    );

    const games = R.compose(
        R.filter(applySearch),
        R.when(R.always(activeCategoryId), R.filter(applyCategory)),
        R.map(id => getGameById(state, id))
    )(state.gamesPage.ids);

    return games;
}

export const getRenderedGamesLength = state => R.length(state.gamesPage.ids);
export const getTotalBasketCount = (state) => R.length(state.basket);

export const getTotalBasketPrice = (state) => {
    const totalPrice = R.compose(
        R.sum,
        R.pluck('price'),
        R.map(id => getGameById(state, id))
    )(state.basket)

    return totalPrice;
};

export const getCategories = state => R.values(state.categories);

export const getActiveCategoryId = ownProps => R.path(['params', 'id'], ownProps);

export const getBasketGamesWithCount = state => {
    const gameCount = id => R.compose(
        R.length,
        R.filter(basketId => R.equals(id, basketId))
    )(state.basket);
    
    const gameWithCount = game => R.assoc('count', gameCount(game.id), game);
    
    const uniqueIds = R.uniq(state.basket);
    const games = R.compose(
        R.map(gameWithCount),
        R.map(id => getGameById(state, id))
    )(uniqueIds);

    return games;
}