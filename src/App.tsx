import { Provider } from "react-redux";
import RouterPage from "./router/Router";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterPage />
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
