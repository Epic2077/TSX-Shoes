import { Provider } from "react-redux";
import RouterPage from "./router/Router";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import CartProvider from "./providers/CartProvider";
import WishlistInitializer from "./components/wishlist/wishListInitializer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
              <WishlistInitializer>
                <RouterPage />
              </WishlistInitializer>
            </PersistGate>
          </QueryClientProvider>
        </CartProvider>
      </Provider>
    </>
  );
}

export default App;
