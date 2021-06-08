import React, { useState, createContext, useContext } from "react";

const DeliveryContext = createContext();

export default function DeliveryProvider({ children }) {
  const [delivery, setDelivery] = useState(0);

  return (
    <DeliveryContext.Provider value={{ delivery, setDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context)
    throw new Error("useDelivery deve ser utilizado com um DeliveryProvider");

  const { delivery, setDelivery } = context;

  return { delivery, setDelivery };
}
