import React, { useState, useEffect } from "react";
import "./Header.css";
import Logo from "./Logo";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import Search from "./Search";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setKeyword } from "../../store/searchSlice";

function Header() {
  const { isLoggedIn } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // 여기서 장바구니 상품의 개수를 계산하거나 API에서 가져오는 로직을 작성할 수 있습니다.
    setCartItemCount(2);
  }, []);

  return (
    <header className="drugstore-header">
      <div className="header-top">
        <Logo />
        <div>
          <Search />
        </div>
        <UserActions cartItemCount={cartItemCount} isLoggedIn={isLoggedIn} />
      </div>
      <div className="navigation-search">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
