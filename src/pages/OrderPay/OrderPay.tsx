import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";
import TermsForm from "./TermsAgreement";
import DeliveryInfo from "./DeliveryInfo";
import FinalPaymentInfo from "./FinalPaymentInfo";
import Coupon from "./Coupon";
import DeliveryProduct from "./DeliveryProduct";

const OrderForm: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  return (
    <div>
      <div className="order_payment_wrap">
        <div className="lefe_area">
          <div className="order_payment_container">
            <h1 className="orderpay_title">주문/결제</h1>
            <DeliveryInfo />
            <DeliveryProduct />
            <Coupon />
            <div className="payment_container">
              <h2 className="orderpay_subtitle">결제</h2>
              <div className="button-container">
                <button type="button">신용카드</button>
                <button type="button">Kakao Pay</button>
              </div>
            </div>
            <TermsForm />
          </div>
        </div>
        <FinalPaymentInfo />
      </div>
    </div>
  );
};

export default OrderForm;
