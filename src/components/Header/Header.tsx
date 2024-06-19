import React, { useState, useEffect } from "react";
import "./Header.css";
import Logo from "./Logo";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import Search from "./Search";

function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 여기서 장바구니 상품의 개수를 계산하거나 API에서 가져오는 로직을 작성할 수 있습니다.
    // 예를 들어, 상품의 개수를 2로 설정
    setCartItemCount(2);

    // 임시로 로그인 상태를 true로 설정
    // 실제로는 로그인 상태를 확인하는 로직이 필요합니다.
    setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직을 작성합니다.
    // 예를 들어, 토큰을 삭제하거나 API에 로그아웃 요청을 보냅니다.
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  };

  return (
    <header className="drugstore-header">
      <div className="header-top">
        <Logo />
        <div>
          <Search />
        </div>
        <UserActions
          cartItemCount={cartItemCount}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      </div>
      <div className="navigation-search">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
