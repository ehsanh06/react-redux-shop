import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {Link} from 'react-router';

import { removeGameFromBasket, cleanBasket, basketCheckout} from '../../actions';

import { getBasketGamesWithCount, getTotalBasketPrice } from '../../selectors';

const Basket = ({games, totalPrice, removeGameFromBasket, cleanBasket, basketCheckout}) => {
    const isBasketEmpty = R.isEmpty(games);

    // console.log('games: ', games);
    const renderContent = () => {

        return (
            <div>
                {
                    isBasketEmpty && (<div>Your shopping cart is empty!</div>)
                }

                <div className='table-responsive'>
                    <table className='table-bordered table-striped table-condensed cf'>
                        <tbody>
                            {
                                games.map((game, index) => (
                                    <tr
                                        key={index}
                                        className='item-checkout'
                                    >
                                        <td className='first-column-checkout'>
                                            <img 
                                                className='img-thumbnail'
                                                src={game.image}
                                                alt={game.name}
                                            />
                                        </td>
                                        <td>{game.name}</td>
                                        <td>${game.price}</td>
                                        <td>{game.count}</td>
                                        <td>
                                            <span 
                                                className='delete-cart'
                                                onClick={() => removeGameFromBasket(game.id)}
                                            >
                                                
                                            </span> 
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) && 
                    <div className='row'>
                        <div className='pull-right total-user-checkout'>
                            <b>Total:</b>
                            ${totalPrice}
                        </div>
                    </div>
                }
            </div>
        )
    }


    const renderSidebar = () => (
        <div>
            <Link
                className='btn btn-info'
                to='/'
            >
                <span className='glyphicon glyphicon-info-sign' />
                <span>Contiue Shopping!</span>
            </Link>

            {
                R.not(isBasketEmpty) &&
                <div>
                    <button
                        className='btn btn-danger'
                        onClick={cleanBasket}
                    >
                        <span className='glyphicon glyphicon-trash' />
                        Clean Cart
                    </button>
                    <button
                        className='btn btn-success'
                        onClick={() => basketCheckout(games)}
                    >
                        <span className='glyphicon glyphicon-envelope' />
                        Checkout
                    </button>
                </div>
            }
        </div>
    );

    return (
        <div className='view-container'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-9'>
                        {renderContent()}
                    </div>
                    <div className='col-md-3 btn-user-checkout'>
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    games: getBasketGamesWithCount(state),
    totalPrice: getTotalBasketPrice(state)
});

const mapDispatchToProps = {
    removeGameFromBasket,
    cleanBasket,
    basketCheckout
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);