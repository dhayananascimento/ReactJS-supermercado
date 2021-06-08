import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}
