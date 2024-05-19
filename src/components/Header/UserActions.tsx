import React from "react";
import HeaderLogin from "../../assets/png/login.png";
import HeaderMyPage from "../../assets/png/mypage.png";
import HeaderCart from "../../assets/png/cart.png";

interface UserActionsProps {}

function UserActions() {
  return (
    <div className="user-actions">
      <a href="#">
        <img src={HeaderLogin} alt="로그인" />
      </a>
      <a href="#">
        <img src={HeaderMyPage} alt="마이페이지" />
      </a>
      <a href="#">
        <img src={HeaderCart} alt="장바구니" />
      </a>
    </div>
  );
}

export default UserActions;
