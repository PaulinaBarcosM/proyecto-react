import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState([]);

  const addItem = (product, qtyItem = 1) => {
    const existingProduct = cartState.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.qtyItem < product.stock) {
        setCartState(
          cartState.map((item) =>
            item.id === product.id
              ? { ...item, qtyItem: item.qtyItem + 1 }
              : item
          )
        );
      }
    } else {
      setCartState([
        ...cartState,
        { ...product, qtyItem: Math.min(qtyItem, product.stock) },
      ]);
    }
  };

  const removeItem = (product) => {
    const existingProduct = cartState.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.qtyItem === 1) {
        setCartState(cartState.filter((item) => item.id !== product.id));
      } else {
        setCartState(
          cartState.map((item) =>
            item.id === product.id
              ? { ...item, qtyItem: item.qtyItem - 1 }
              : item
          )
        );
      }
    }
  };

  const deleteItem = (product) => {
    setCartState(cartState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCartState([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addItem,
        removeItem,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
