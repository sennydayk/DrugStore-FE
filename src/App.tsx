import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import AccountInfoFinder from "./pages/AccountInfoFinder/AccountInfoFinder";
import CartPage from "./pages/ShopCart/ShopCart";
import OrderPayPage from "./pages/OrderPay/OrderPay";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/find-email" element={<AccountInfoFinder />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order" element={<OrderPayPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
