import Routes from "./routes";
import "./global.scss";

import ListProvider from "./store/providers/ListProvider.js";

function App() {
  return (
    <ListProvider>
      <Routes />
    </ListProvider>
  );
}

export default App;
