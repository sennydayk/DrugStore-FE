import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";

const FinalPaymentInfo: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  return (
    <div className="order_payment_wrap">
      <div className="right_area">
        <h2 className="orderpay_subtitle2">최종 결제정보</h2>
        <ul className="total_payment_box">
          <li>
            <span className="tx_tit">총 상품금액</span>
            <span className="tx_cont">
              <span className="tx_num">25,200</span>원
            </span>
          </li>
          <li>
            <span className="tx_tit">쿠폰할인금액</span>
            <span className="tx_cont">
              <span className="tx_num" id="totDscntAmt_span">
                0
              </span>
              원
            </span>
          </li>
          <li>
            <span className="tx_tit">총 배송비</span>
            <span className="tx_cont">
              <span className="tx_num" id="dlexPayAmt_span">
                0
              </span>
              원
            </span>
          </li>
          <li className="total">
            <span className="tx_tit">최종 결제금액</span>
            <span className="tx_cont">
              <span className="tx_num" id="totPayAmt_sum_span">
                25,200
              </span>
              원
            </span>
          </li>
          <li>
            <button
              className="btnPayment"
              id="btnPay"
              name="btnPay"
              type="button"
            >
              결제하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FinalPaymentInfo;
