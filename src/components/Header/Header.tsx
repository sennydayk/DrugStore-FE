import React, { useState, useEffect } from "react";
import "./Header.css";
import Logo from "./Logo";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setKeyword } from "../../store/searchSlice";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";
import { setSearchKeyword } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";

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
          <button className="header_searchbutton" type="submit">
            🔍
          </button>
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
