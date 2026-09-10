import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";
import { Orders } from "./pages/Orders";
import { OrderDetail } from "./pages/OrderDetail";
import { Stores } from "./pages/Stores";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderNumber" element={<OrderDetail />} />
          <Route path="/stores" element={<Stores />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
