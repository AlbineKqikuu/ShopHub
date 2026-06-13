import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const cartItemsCount = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );
    const favoritesCount = useSelector((state) => state.favorites.items.length);

    return (
        <header className="header">
            <div className="container header__container">
                <Link to="/" className="header__logo">
                    Shop<span>Hub</span>
                </Link>

                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li>
                            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
                                Cart
                                {cartItemsCount > 0 && <span className="badge">{cartItemsCount}</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                                Favorites
                                {favoritesCount > 0 && <span className="badge badge--accent">{favoritesCount}</span>}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
