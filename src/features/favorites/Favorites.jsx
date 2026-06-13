import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import './Favorites.scss';

const Favorites = () => {
    const { items } = useSelector((state) => state.favorites);

    if (items.length === 0) {
        return (
            <div className="container favorites-empty">
                <h2>No favorites yet</h2>
                <p>You haven't saved any items to your favorites list.</p>
                <Link to="/products" className="btn btn--primary">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="container favorites-page">
            <h1 className="favorites-page__title">My Favorites</h1>

            <div className="product-grid">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
