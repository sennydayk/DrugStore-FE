import React from "react";
import "./Footer.css";
import logo from "../../assets/png/store.png";

function Footer() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="footer-wrapper">
        <img src={logo} className="footer-logo" />
        <div className="footer-right">
          <div className="footer-info">
            <p>대표이사 : 이선정 | 사업자등록번호 : 809-81-01574</p>
            <p>
              주소 : (04323) 서울특별시 용산구 한강대로 372, 24층 (동자동,
              KDB타워)
            </p>
            <p>통신판매업신고번호 : 2019-서울용산-1428</p>
            <p>이메일 : oliveweb@cj.net</p>
          </div>
          <div className="footer-btn">
            <p>
              <button
                onClick={() =>
                  alert("상품문의는 상품 상세페이지에서 가능합니다.")
                }
              >
                FAQ
              </button>
            </p>
            <p>
              <button
                onClick={() => alert("가맹문의는 본사 이메일로 연락주세요.")}
              >
                가맹문의
              </button>
            </p>
            <p>
              <button
                onClick={() => alert("고객센터 영업 시간 : 평일 09시 ~ 17시")}
              >
                고객센터
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
