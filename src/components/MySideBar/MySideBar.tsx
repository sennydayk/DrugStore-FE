import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import MySideBarItem from "./MySideBarItem";
import "./MySideBar.css";

function MySideBar() {
  const menus = [
    { name: "나의 회원정보", path: "/mypage/account" },
    { name: "구매내역 조회", path: "/mypage/purchase-history" },
    { name: "찜 목록", path: "/mypage/likes" },
    { name: "내가 쓴 리뷰", path: "/mypage/reviews" },
    { name: "내가 쓴 문의", path: "/mypage/questions" },
  ];
  return (
    <div className="mysidebar-wrapper">
      <h1 className="mysidebar-title">마이페이지</h1>
      <div className="mysidebar-menu">
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "menu-active" : "menu-normal"
              }
            >
              <MySideBarItem menu={menu} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default MySideBar;
