import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import AccountInfoFinder from "./pages/AccountInfoFinder/AccountInfoFinder";
import CartPage from "./pages/ShopCart/ShopCart";
import OrderPayPage from "./pages/OrderPay/OrderPay";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup/Signup";
import Mypage from "./pages/Mypage/Mypage";
import PurchaseHistory from "./pages/Mypage/PurchaseHistory";
import MyLikes from "./pages/Mypage/MyLikes";
import MyReviews from "./pages/Mypage/MyReviews";
import Questions from "./pages/Mypage/Questions";
import "./App.css";

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/find-email" element={<AccountInfoFinder />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order" element={<OrderPayPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage/account" element={<Mypage />} />
      <Route path="/mypage/purchase-history" element={<PurchaseHistory />} />
      <Route path="/mypage/likes" element={<MyLikes />} />
      <Route path="/mypage/reviews" element={<MyReviews />} />
      <Route path="/mypage/questions" element={<Questions />} />
    </Routes>
  </div>
);

export default App;
