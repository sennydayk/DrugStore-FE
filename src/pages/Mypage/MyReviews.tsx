import React from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import { useState } from "react";
import ShowReview from "../../components/MyPageModal/ShowReview";

function MyReviews() {
  const [showReview, setShowReview] = useState<boolean>(false);
  const handleShowReview = () => {
    setShowReview(!showReview);
  };

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          <table className="myreviews-table">
            <thead>
              <tr>
                <th colSpan={2} style={{ borderRight: "1px solid #dddddd" }}>
                  상품
                </th>
                <th colSpan={2}>리뷰</th>
              </tr>
            </thead>
            <tbody>
              <tr className="myreviews-eachitem">
                <td style={{ width: "25%" }}>
                  <img />
                </td>
                <td style={{ width: "25%", borderRight: "1px solid #dddddd" }}>
                  <p>brandName</p>
                  <p>product</p>
                  <p>option</p>
                </td>
                <td style={{ width: "25%", textAlign: "center" }}>
                  <p>createdAt</p>
                  <p>rating</p>
                  <p>content</p>
                </td>
                <td style={{ width: "25%", textAlign: "center" }}>
                  <button onClick={handleShowReview}>리뷰 수정</button>
                  <button style={{ marginLeft: "30px" }}>리뷰 삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showReview && (
          <ShowReview showReview={showReview} setShowReview={setShowReview} />
        )}
      </div>
    </>
  );
}

export default MyReviews;
