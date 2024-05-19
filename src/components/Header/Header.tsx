import React from "react";
import "./Header.css";
import Logo from "./Logo";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import Search from "./Search";

function Header() {
  return (
    <header className="drugstore-header">
      <div className="header-top">
        <Logo />
        <div>
          <Search />
        </div>
        <UserActions />
      </div>
      <div className="navigation-search">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
