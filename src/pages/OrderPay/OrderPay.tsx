import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";
import TermsForm from "./TermsAgreement";
import DeliveryInfo from "./DeliveryInfo";
import FinalPaymentInfo from "./FinalPaymentInfo";
import Coupon from "./Coupon";
import DeliveryProduct from "./DeliveryProduct";

interface OrderData {
  coupon_id: number;
  coupon_name: string;
  coupon_discount: number;
}

const OrderForm: React.FC = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<OrderData | null>(null);

  const handleCouponChange = (coupon: OrderData | null) => {
    setSelectedCoupon(coupon);
  };

  return (
    <div>
      <div className="order_payment_wrap">
        <div className="lefe_area">
          <div className="order_payment_container">
            <h1 className="orderpay_title">주문/결제</h1>
            <DeliveryInfo />
            <DeliveryProduct />
            <Coupon onCouponChange={handleCouponChange} />
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
        <FinalPaymentInfo selectedCoupon={selectedCoupon} />
      </div>
    </div>
  );
};

export default OrderForm;
