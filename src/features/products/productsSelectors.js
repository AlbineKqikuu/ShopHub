import { createSelector } from '@reduxjs/toolkit';

const selectProductsItems = (state) => state.products.items;
const selectFilters = (state) => state.filters;

export const selectFilteredProducts = createSelector(
    [selectProductsItems, selectFilters],
    (products, filters) => {
        let result = [...products];

        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(query));
        }

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter((p) => p.category === filters.category);
        }

        // Sorting
        switch (filters.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                result.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            default:
                break;
        }

        return result;
    }
);
