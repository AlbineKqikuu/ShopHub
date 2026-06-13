import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import cartReducer from '../features/cart/cartSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import themeReducer from '../features/theme/themeSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
});

export default rootReducer;
