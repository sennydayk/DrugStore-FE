import React, { useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";

// 마이페이지 메인화면(회원정보)
function Mypage() {
  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          <div className="mypage-account-header">
            <h1 className="mypage-account-title">나의 회원정보</h1>
            <h3 className="mypage-account-subtitle">기본정보</h3>
          </div>
          <table className="mypage-account-table">
            <tr>
              <th>이름</th>
              <td>username</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>usernickname</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>useremail</td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td>userphonenumber</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>userbirth</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>useraddress</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Mypage;
