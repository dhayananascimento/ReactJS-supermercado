import Routes from "./routes";
import "./global.scss";

import CartProvider from "./store/providers/CartProvider.js";
import DeliveryProvider from "./store/providers/DeliveryProvider.js";

function App() {
  return (
    <CartProvider>
      <DeliveryProvider>
        <Routes />
      </DeliveryProvider>
    </CartProvider>
  );
}

export default App;
