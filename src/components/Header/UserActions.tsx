import React from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../../assets/png/login.png";
import HeaderLogout from "../../assets/png/power-off.png";
import HeaderMyPage from "../../assets/png/mypage.png";
import HeaderCart from "../../assets/png/cart.png";
import "./Header.css";

interface UserActionsProps {
  cartItemCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

function UserActions({
  cartItemCount,
  isLoggedIn,
  onLogout,
}: UserActionsProps) {
  return (
    <div className="user-actions">
      {isLoggedIn ? (
        <button className="logout_btn" onClick={onLogout}>
          <img src={HeaderLogout} alt="로그아웃" />
        </button>
      ) : (
        <Link to="/auth/login">
          <img src={HeaderLogin} alt="로그인" />
        </Link>
      )}
      <a href="/mypage/account">
        <img src={HeaderMyPage} alt="마이페이지" />
      </a>
      <a href="/cart/myCart">
        <img src={HeaderCart} alt="장바구니" className="useractiocart" />
        {cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </a>
    </div>
  );
}

export default UserActions;
