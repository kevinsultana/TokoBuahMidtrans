import React, {createContext, useState} from 'react';

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = product => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If product already exists, increase the quantity
      setCart(
        cart.map(item =>
          item.id === product.id
            ? {...existingProduct, quantity: existingProduct.quantity + 1}
            : item,
        ),
      );
    } else {
      // If product does not exist, add it with quantity 1
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to update product quantity
  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map(item =>
        item.id === productId ? {...item, quantity: quantity} : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{cart, addToCart, removeFromCart, clearCart, updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
