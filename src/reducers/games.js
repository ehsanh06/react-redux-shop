import R from 'ramda';

import { FETCH_GAMES_SUCCESS, LOAD_MORE_GAMES_SUCCESS, FETCH_GAME_BY_ID_SUCCESS} from '../actionTypes';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_GAMES_SUCCESS:
            const newValues = R.indexBy(R.prop('id'), payload);
            return R.merge(state, newValues);

        case LOAD_MORE_GAMES_SUCCESS:
            const moreValues = R.indexBy(R.prop('id'), payload);
            return R.merge(state, moreValues);
        
        case FETCH_GAME_BY_ID_SUCCESS:
            return R.assoc(payload.id, payload, state);
        default:
            return state;
    }
};