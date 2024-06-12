import React, { useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import MyQuestion from "../../components/MyPageModal/MyQuestion";

function Questions() {
  const [myQuestion, setMyQuestion] = useState<boolean>(false);
  const handleMyQuestion = () => {
    setMyQuestion(!myQuestion);
  };

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          <div className="questions-header">
            <h2>1 : 1 문의</h2>
            {/*  상세페이지로 이동 */}
            <button className="questions-button">1:1 문의하기</button>
          </div>
          <table className="questions-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
                <th>작성일자</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              <tr className="questions-eachitem">
                <td>상품문의</td>
                <td>
                  <button onClick={handleMyQuestion}>reviewcontent</button>
                </td>
                <td>createAt</td>
                <td>답변완료</td>
              </tr>
            </tbody>
          </table>
        </div>
        {MyQuestion && (
          <MyQuestion myQuestion={myQuestion} setMyQuestion={setMyQuestion} />
        )}
      </div>
    </>
  );
}

export default Questions;
