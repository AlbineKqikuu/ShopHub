import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '',
    category: 'all',
    sortBy: 'default', // 'price-asc' | 'price-desc' | 'rating-desc'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        resetFilters: () => initialState,
    },
});

export const { setSearchQuery, setCategory, setSortBy, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
