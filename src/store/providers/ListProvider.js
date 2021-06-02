import React, { useState, createContext } from "react";

export const ListContext = createContext();

export default function ListProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <ListContext.Provider value={[cart, setCart]}>
      {children}
    </ListContext.Provider>
  );
}
