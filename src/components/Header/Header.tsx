import React, { useState, useEffect } from "react";
import "./Header.css";
import Logo from "./Logo";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";
import './Header.css';


function Header() {

  const { isLoggedIn } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchTerm));
    // navigate("/");
  };

  useEffect(() => {
    // 여기서 장바구니 상품의 개수를 계산하거나 API에서 가져오는 로직을 작성할 수 있습니다.
    setCartItemCount(2);
  }, []);

  return (
    <header className="drugstore-header">
      <div className="header-top">
        <Logo />
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            className="header_searchinput"
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="header_searchbutton" type="submit">🔍</button>
        </form>
        <UserActions cartItemCount={cartItemCount} isLoggedIn={isLoggedIn} />
      </div>
      <div className="navigation-search">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
