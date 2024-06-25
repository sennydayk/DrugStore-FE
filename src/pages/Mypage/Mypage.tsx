import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import axios from "axios";

interface userInfo {
  name: string;
  nickName: string;
  birthday: string;
  phoneNumber: string;
  address: string;
  email: string;
}

// 마이페이지 메인화면(회원정보)
const Mypage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);

  // mypage 메인(회원정보) api 가져오기
  const getData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      console.log("사용할 토큰:", token);

      const config = {
        method: "get", // HTTP 메서드
        url: "https://drugstoreproject.shop/mypage/userInfo",
        data: {},
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };

      // axios를 사용하여 요청을 보냄
      const response = await axios(config);
      console.log("서버 응답 데이터:", response.data);
      setUserInfo(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data: ", error.message);
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태 코드:", error.response.status);
        }
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          {userInfo ? (
            <table className="mypage-account-table">
              <tr>
                <th>이름</th>
                <td>{userInfo.name}</td>
              </tr>
              <tr>
                <th>닉네임</th>
                <td>{userInfo.nickName}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <th>휴대폰번호</th>
                <td>{userInfo.phoneNumber}</td>
              </tr>
              <tr>
                <th>생년월일</th>
                <td>{userInfo.birthday}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{userInfo.address}</td>
              </tr>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Mypage;
