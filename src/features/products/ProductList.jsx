import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from './productsSlice';
import { selectFilteredProducts } from './productsSelectors';
import { setSearchQuery, setCategory, setSortBy } from '../filters/filtersSlice';
import ProductCard from './ProductCard';
import './ProductList.scss';

const ProductList = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);
    const { categories, status, error } = useSelector((state) => state.products);
    const { searchQuery, category, sortBy } = useSelector((state) => state.filters);

    // Local state for debounced search input to make typing feel smooth
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    // Debounce search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchQuery(searchInput));
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, dispatch]);

    const handleCategoryChange = (e) => {
        dispatch(setCategory(e.target.value));
    };

    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    if (status === 'loading') {
        return <div className="loading">Loading products...</div>;
    }

    if (status === 'failed') {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container product-list-page">
            <div className="product-list-page__controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <div className="filters">
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="default">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Highest Rated</option>
                    </select>
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="no-products">No products found matching your criteria.</div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
