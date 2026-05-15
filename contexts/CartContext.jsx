'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart from localStorage when the app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setCartLoaded(true);
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, cartLoaded]);
  
  function addToCart(product) {
    const productExists = cartItems.find((item) => item._id === product._id);

    if (productExists) {
      const updatedCart = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setCartItems(updatedCart);
    } else {
      const newCartItem = {
        _id: product._id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
        quantity: 1,
      };

      setCartItems([...cartItems, newCartItem]);
    }
  }

  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item._id !== productId);

    setCartItems(updatedCart);
  }

  function increaseQuantity(productId) {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCartItems(updatedCart);
  }

  function decreaseQuantity(productId) {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
