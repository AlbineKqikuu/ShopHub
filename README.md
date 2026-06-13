# ShopHub

ShopHub is a premium e-commerce product catalog built with React 18, Redux Toolkit, and Axios. It provides a seamless shopping experience with real-time searching, filtering, and a persistent shopping cart and favorites list.

## Features

- **Product Listing**: Fetch and display products in a responsive grid.
- **Advanced Filtering**: Filter by category and sort by price or rating.
- **Real-time Search**: Debounced search for smooth user interaction.
- **Product Details**: Detailed view for every product with quantity selection.
- **Shopping Cart**: Manage your items with subtotal, tax, and shipping calculations.
- **Favorites**: Save your favorite items for later.
- **Persistence**: Cart and favorites are automatically saved to `localStorage`.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit (with memoized selectors)
- **Routing**: React Router v6
- **API Client**: Axios (centralized instance with interceptors)
- **Styling**: SCSS (Vanilla, no UI libraries)
- **Development Tool**: Vite

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/albin/shophub.git
   cd shophub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run locally**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run format`: Formats code with Prettier.
- `npm run preview`: Previews the production build locally.

## Folder Structure

```text
shophub/
├── src/
│   ├── app/           # Redux store configuration
│   ├── components/    # Shared UI components (Layout, Header, Footer)
│   ├── features/      # Feature-based logic (Cart, Favorites, Products, Filters)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API service (Axios instance)
│   ├── styles/        # Global SCSS variables and base styles
│   ├── utils/         # Utility functions (localStorage)
│   ├── App.jsx        # Root component and routing
│   └── main.jsx       # Entry point
```

## Architecture Decisions

- **Feature-based structure**: Organized logic by features (products, cart, favorites) for better scalability and maintainability.
- **Redux Toolkit**: Used slices and thunks for efficient state management and async data fetching.
- **Memoized Selectors**: Implemented `createSelector` to prevent unnecessary re-renders when filtering or sorting products.
- **Centralized API**: Used a single Axios instance with interceptors for consistent error handling and clean API calls.
- **SCSS Modules/Variables**: Used SCSS variables and mixins for a consistent design system and easy theming.

## Future Improvements

- [ ] Dark mode toggle persistence.
- [ ] Implement Skeleton loaders for better UX during data fetching.
- [ ] Add unit and integration tests using Vitest and React Testing Library.
- [ ] Implement a full checkout flow with payment integration simulation.

## Time Spent
Total estimated time: 6-8 hours.

---
Built by [Albine Kqiku](https://github.com/albin)
