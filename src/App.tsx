import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login"; // 로그인 페이지 컴포넌트
import AccountInfoFinder from "./pages/AccountInfoFinder/AccountInfoFinder";

const Root: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/find-email" element={<AccountInfoFinder />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
