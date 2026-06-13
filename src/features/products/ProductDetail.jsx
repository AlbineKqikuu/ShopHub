import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { toggleFavorite } from '../favorites/favoritesSlice';
import api from '../../services/api';
import './ProductDetail.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const isFavorite = useSelector((state) =>
        state.favorites.items.some((item) => item.id === Number(id))
    );

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(product));
    };

    if (loading) return <div className="loading">Loading product...</div>;
    if (error) return (
        <div className="container error-page">
            <h2>404</h2>
            <p>{error}</p>
            <Link to="/products" className="btn btn--primary">Back to Products</Link>
        </div>
    );

    return (
        <div className="container product-detail">
            <div className="product-detail__grid">
                <div className="product-detail__image-wrapper">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-detail__info">
                    <p className="product-detail__category">{product.category}</p>
                    <h1 className="product-detail__title">{product.title}</h1>

                    <div className="product-detail__rating">
                        <span className="star">⭐</span>
                        <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                    </div>

                    <p className="product-detail__price">${product.price.toFixed(2)}</p>

                    <p className="product-detail__description">{product.description}</p>

                    <div className="product-detail__actions">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>

                        <button className="btn btn--primary" onClick={handleAddToCart}>
                            Add to Cart
                        </button>

                        <button
                            className={`btn btn--outline ${isFavorite ? 'active' : ''}`}
                            onClick={handleToggleFavorite}
                        >
                            {isFavorite ? '❤️ In Favorites' : '🤍 Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
