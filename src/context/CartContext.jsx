import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState([]);

  const addItem = (product) => {
    const existingProduct = cartState.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartState(
        cartState.map((item) =>
          item.id === product.id ? { ...item, qtyItem: item.qtyItem + 1 } : item
        )
      );
    } else {
      setCartState([...cartState, { ...product, qtyItem: 1 }]);
    }
  };

  const removeItem = (product, qty = 1) => {
    setCartState((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, qtyItem: item.qtyItem - qty }
            : item
        )
        .filter((item) => item.qtyItem > 0)
    );
  };

  const deleteItem = (product) => {
    setCartState(cartState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCartState([]);
  };

  const totalItems = cartState.reduce((acc, item) => acc + item.qtyItem, 0);
  const totalPrice = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartState,
        addItem,
        removeItem,
        deleteItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
