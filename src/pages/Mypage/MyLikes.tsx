import React from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";

function MyLikes() {
  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
      </div>
    </>
  );
}

export default MyLikes;
