import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../../assets/png/login.png";
import HeaderLogout from "../../assets/png/power-off.png";
import HeaderMyPage from "../../assets/png/mypage.png";
import HeaderCart from "../../assets/png/cart.png";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserActionsProps {
  isLoggedIn: boolean;
}

function UserActions({ isLoggedIn }: UserActionsProps) {
  let navigate = useNavigate();
  const { logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  // 로그아웃 버튼 핸들러
  const handleLogout = () => {
    if (isLoggedIn) {
      if (window.confirm("로그아웃하시겠습니까?")) {
        window.alert("로그아웃되었습니다. 홈으로 이동합니다.");
        logout();
        setCartItemCount(0); // 로그아웃 시 cartItemCount를 0으로 설정
        navigate("/");
      }
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const config = {
        method: "get",
        url: "https://drugstoreproject.shop/cart",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response = await axios(config);
      setCartItemCount(response.data.data.length);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          // 장바구니가 비어있는 경우
          setCartItemCount(0);
        } else {
          console.error(
            "장바구니 데이터를 가져오는 중 오류 발생:",
            error.message
          );
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchCartItems();

  //     const interval = setInterval(() => {
  //       fetchCartItems();
  //     }, 3000); // 3초마다 장바구니 상태를 갱신

  //     return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  //   }
  // }, [isLoggedIn, logout]);

  return (
    <div className="user-actions">
      {isLoggedIn ? (
        <img src={HeaderLogout} alt="로그아웃" onClick={handleLogout} />
      ) : (
        <Link to="/auth/login">
          <img src={HeaderLogin} alt="로그인" />
        </Link>
      )}
      {isLoggedIn ? (
        <Link to={"/mypage/account"}>
          <img src={HeaderMyPage} alt="마이페이지" />
        </Link>
      ) : (
        <Link to={"/auth/login"}>
          <img
            src={HeaderMyPage}
            alt="마이페이지"
            onClick={() => {
              alert("로그인이 필요한 서비스입니다.");
              navigate("/auth/login");
            }}
          />
        </Link>
      )}
      <Link to={"/cart"}>
        <img src={HeaderCart} alt="장바구니" className="useractiocart" />
        {isLoggedIn && cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </Link>
    </div>
  );
}

export default UserActions;
