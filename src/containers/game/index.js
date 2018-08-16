import React, {Component} from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {Link} from 'react-router';

import {getGameById} from '../../selectors';
import {fetchGameById, addGameToBasket} from '../../actions'
import BasketCart from '../../components/basketCart';

class Game extends Component {
    componentDidMount() {
        this.props.fetchGameById(this.props.params.id);
    }

    renderFields = () => {
        const {game} = this.props;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'platform',
                'release',
                'genre',
                'players',
                'developers',
                'series'
            ])
        )(game);
        return columnFields.map(([key, value]) => (
            <div className='column' key={key}>
                <div className='ab-details-title'>
                    <p>{key}</p>
                </div>
                <div className='ab-details-info'>
                    {value}
                </div>
            </div>
        ));
    }

    renderContent = () => {
        const {game} = this.props;

        return (
            <div className='thumbnail'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img 
                            className='img-thumbnail' 
                            src={game.image}
                            alt={game.name}
                        />
                    </div>
                    <div className='col-md-6'>
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4 className='pull-right'>${game.price}</h4>
                    <h4>{game.name}</h4>
                    <p>{game.description}</p>
                </div>
            </div>
        )
    }


    renderSidebar = () => {
        const {game, addGameToBasket} = this.props;
        return ( 
            <div>
                <p className='lead'>Quick Shop</p>
                <BasketCart />
                <div className='form-group'>
                    <h1>{game.name}</h1>
                    <h2>${game.price}</h2>
                </div>
                <Link 
                    to='/' 
                    className='btn btn-info btn-block'
                >
                    Back to Store
                </Link>
                <button
                    type='button'
                    className='btn btn-success btn-block'
                    onClick={() => addGameToBasket(game.id)}
                >
                    Add to Cart
                </button>
            </div>
        )
    }

    render () {
        // console.log('game', this.props.game);
        const {game} = this.props;
        return (
            <div className='view-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9'>
                            {game && this.renderContent()}
                        </div>

                        <div className='col-md-3'>
                            {game && this.renderSidebar()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: getGameById(state, state.gamePage.id)
    }
}

const mapDispatchToProps = {
    fetchGameById,
    addGameToBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);