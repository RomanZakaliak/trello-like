import { Provider } from "react-redux";
import Page from "./components/page.component";
import { store } from "./lib/redux/store";
import { Toaster } from "./components/ui/toaster";

export const App = () => {
  return (
    <Provider store={store}>
      <Page />
      <Toaster />
    </Provider>
  );
};
