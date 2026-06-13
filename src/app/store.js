import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { saveState } from '../utils/localStorage';

export const store = configureStore({
    reducer: rootReducer,
});

// Persistence subscription
store.subscribe(() => {
    saveState('cart_state', store.getState().cart);
    saveState('favorites_state', store.getState().favorites);
    saveState('theme_mode', store.getState().theme.mode);
});
