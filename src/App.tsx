import { Provider } from "react-redux";
import RouterPage from "./router/Router";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterPage />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
