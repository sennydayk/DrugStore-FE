import React, { useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import testimg from "../../assets/jpeg/test.jpeg";
import ReviewAdd from "../../components/MyPageModal/ReviewAdd";

function PurchaseHistory() {
  const [reviewAdd, setReviewAdd] = useState<boolean>(false);
  const handleReviewAdd = () => {
    setReviewAdd(!reviewAdd);
  };

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          <table className="purchase-history-table">
            <thead>
              <tr>
                <th style={{ width: "20%", borderRight: "1px solid #dddddd" }}>
                  주문번호
                </th>
                <th
                  colSpan={2}
                  style={{ width: "50%", borderRight: "1px solid #dddddd" }}
                >
                  상품
                </th>
                <th style={{ width: "15%", borderRight: "1px solid #dddddd" }}>
                  작성 기간
                </th>
                <th style={{ width: "15%", borderRight: "1px solid #dddddd" }}>
                  리뷰 작성
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="purchase-history-eachitem">
                <td style={{ borderRight: "1px solid #dddddd" }}>
                  ordernumber
                </td>
                <td>
                  <img src={testimg} />
                </td>
                <td style={{ borderRight: "1px solid #dddddd" }}>
                  <p>brandName</p>
                  <p>product</p>
                  <p>option</p>
                </td>
                <td style={{ borderRight: "1px solid #dddddd" }}>period</td>
                <td>
                  <button onClick={handleReviewAdd}>리뷰 작성</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {reviewAdd && (
          <ReviewAdd reviewAdd={reviewAdd} setReviewAdd={setReviewAdd} />
        )}
      </div>
    </>
  );
}

export default PurchaseHistory;
