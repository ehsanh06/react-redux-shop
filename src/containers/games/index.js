import React, {Component} from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {Link} from 'react-router';

import { fetchGames, loadMoreGames, addGameToBasket, fetchCategories } from '../../actions';
import {getGames} from '../../selectors';

class Games extends Component {
    componentDidMount() {
        this.props.fetchGames();
        this.props.fetchCategories();
    }

    renderGame(game, index) {
        const {addGameToBasket} = this.props;
        const shortDescription = `${R.take(60, game.description)}...`;

        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className='thumbnail'>
                    <img 
                        className='img-thumbnail'
                        src={game.image}
                        alt={game.name}
                    />
                </div>
                <div className='caption'>
                    <h4 className='pull-right'>{game.price}</h4>
                    <h4>
                        <Link to={`/games/${game.id}`}>
                            {game.name}
                        </Link>
                    </h4>
                    <p>{shortDescription}</p>
                    <p className='itemButton'>
                        <button
                            onClick={() => addGameToBasket(game.id)}
                            className='btn btn-primary'
                        >
                            Buy Now!
                        </button>
                        <Link 
                            to={`/games/${game.id}`}
                            className='btn btn-default'
                        >
                            More info
                        </Link>
                    </p>
                </div>
            </div>
        )
    }

    render () {
        const {games, loadMoreGames} = this.props;
        // console.log('games:', games);
        return (
            <div>
                <div className="books row">
                    {games.map((game, index) => this.renderGame(game, index))}
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <button
                            onClick={loadMoreGames}
                            className='pull right btn btn-primary'
                        >
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        games: getGames(state, ownProps)
    }
};

const mapDispatchToProps = {
    fetchGames,
    loadMoreGames,
    addGameToBasket,
    fetchCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);

