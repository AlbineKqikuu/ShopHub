import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Cart from './features/cart/Cart';
// import Favorites from './features/favorites/Favorites';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/products" />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="favorites" element={<div>Favorites Page (Coming Soon)</div>} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
