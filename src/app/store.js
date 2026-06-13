import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import cartReducer from '../features/cart/cartSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import themeReducer from '../features/theme/themeSlice';
import { saveState } from '../utils/localStorage';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
        theme: themeReducer,
    },
});

// Persistence subscription
store.subscribe(() => {
    saveState('cart_state', store.getState().cart);
    saveState('favorites_state', store.getState().favorites);
    saveState('theme_mode', store.getState().theme.mode);
});
