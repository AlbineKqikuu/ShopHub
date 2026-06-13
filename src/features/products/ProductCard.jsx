import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';
import { toggleFavorite } from '../favorites/favoritesSlice';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state) =>
        state.favorites.items.some((item) => item.id === product.id)
    );

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        dispatch(toggleFavorite(product));
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-card__link">
                <div className="product-card__image-wrapper">
                    <img src={product.image} alt={product.title} className="product-card__image" />
                    <button
                        className={`product-card__favorite ${isFavorite ? 'active' : ''}`}
                        onClick={handleToggleFavorite}
                        aria-label="Add to favorites"
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="product-card__info">
                    <p className="product-card__category">{product.category}</p>
                    <h3 className="product-card__title">{product.title}</h3>

                    <div className="product-card__footer">
                        <div className="product-card__rating">
                            <span className="star">⭐</span>
                            <span>{product.rating.rate} ({product.rating.count})</span>
                        </div>
                        <p className="product-card__price">${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>

            <button className="product-card__add-btn" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ProductCard;
