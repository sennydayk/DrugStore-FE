import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Mypage from "./pages/Mypage/Mypage";
import PurchaseHistory from "./pages/Mypage/PurchaseHistory";
import MyLikes from "./pages/Mypage/MyLikes";
import MyReviews from "./pages/Mypage/MyReviews";
import Questions from "./pages/Mypage/Questions";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/mypage/account" element={<Mypage />} />
        <Route path="/mypage/purchase-history" element={<PurchaseHistory />} />
        <Route path="/mypage/likes" element={<MyLikes />} />
        <Route path="/mypage/reviews" element={<MyReviews />} />
        <Route path="/mypage/questions" element={<Questions />} />
      </Routes>
    </>
  );
};

export default App;
