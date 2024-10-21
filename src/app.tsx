import { Provider } from "react-redux";
import Page from "./components/page.component";
import { store } from "./lib/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
