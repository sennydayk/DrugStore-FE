import React from "react";
import AlertAlram from "../../assets/png/alert_alram.png";

interface CartSummaryProps {
  totalPrice: number;
  totalDeliveryFee: number;
  finalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  totalDeliveryFee,
  finalPrice,
}) => {
  return (
    <div className="basket_price_info">
      <div className="sum_price">
        총 상품금액
        <span className="tx_num2">{totalPrice.toLocaleString()}</span>원
        <span className="tx_sign plus"> +</span> 배송비
        <span className="tx_num2">{totalDeliveryFee.toLocaleString()}</span>원
      </div>
      <div className="basket_total_price_info">
        <div className="basket_total_price_alert">
          <img src={AlertAlram} />
          <span className="tx_text">
            결제 시 쿠폰을 적용 받을 경우 금액이 달라질 수 있습니다.
          </span>
        </div>
        <span className="tx_total_price">
          총 결제예상금액
          <span className="tx_price">
            <span className="tx_num3">{finalPrice.toLocaleString()}</span>원
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
