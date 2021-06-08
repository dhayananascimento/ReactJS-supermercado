import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser utilizado com um CartProvider");

  const { cart, setCart } = context;

  return { cart, setCart };
}
