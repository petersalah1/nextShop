# NextShop

A modern ecommerce web application built with Next.js, React, Tailwind CSS, React Query, and Route Ecommerce API.

NextShop provides a complete shopping experience including product browsing, categories, brands, authentication, cart management, wishlist, cash checkout, online Stripe checkout, and order history.

## Live Demo

Coming soon.

## Features

* User authentication: register, login, and logout
* Product listing with pagination and sorting
* Product details page
* Categories and category-based products
* Brands and brand-based products
* Add to cart
* Update cart item quantity
* Remove items from cart
* Clear cart
* Wishlist add/remove
* Wishlist page
* Cash order checkout
* Online Stripe checkout
* User orders page
* Toast notifications for user feedback
* Responsive design for desktop and mobile
* Clean API layer using Axios
* Server state management using React Query

## Tech Stack

* Next.js
* React
* Tailwind CSS
* React Query
* Axios
* React Hot Toast
* Font Awesome
* Route Ecommerce API

## Project Structure

```txt
app/
  products/
  categories/
  brands/
  cart/
  wishlist/
  checkout/
  allorders/
  (auth)/

components/
  Navbar/
  ProductDetails/
  Products/
  Cart/
  WishList/
  shared/

contexts/
  AuthContext.jsx

hooks/
  queries/
  mutations/

services/
  authService.js
  productService.js
  categoryService.js
  brandService.js
  cartService.js
  wishlistService.js
  orderService.js

providers/
  ReactQueryProvider.jsx
  ToastProvider.jsx

lib/
  axios.js
```

## Main Pages

* `/` — Home page
* `/products` — All products
* `/products/[id]` — Product details
* `/categories` — Categories
* `/categories/[id]` — Products by category
* `/brands` — Brands
* `/brands/[id]` — Products by brand
* `/cart` — User cart
* `/wishlist` — User wishlist
* `/checkout` — Checkout page
* `/allorders` — User orders
* `/login` — Login page
* `/register` — Register page

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## API

This project uses the Route Ecommerce API as the backend source for products, authentication, cart, wishlist, checkout, and orders.

## What I Learned

While building this project, I practiced:

* Building a real ecommerce flow with Next.js
* Managing server state with React Query
* Organizing API requests inside service files
* Handling authentication using context and local storage
* Protecting user-specific pages
* Working with cart, wishlist, checkout, and orders
* Improving user experience with loading states and toast notifications
* Building responsive UI with Tailwind CSS

## Future Improvements

* Add search functionality
* Add profile page
* Add saved addresses
* Add payment success and cancel pages
* Improve form validation
* Add skeleton loading components
* Add unit tests for core logic

## Author

Peter Salah
