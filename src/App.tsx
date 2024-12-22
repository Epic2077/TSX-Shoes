import CartProvider from "./providers/CartProvider";
import RouterPage from "./router/Router";

function App() {
  return (
    <>
      <CartProvider>
        <RouterPage />
      </CartProvider>
    </>
  );
}

export default App;
