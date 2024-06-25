import React, { useState, useEffect } from "react";
import "./ShopCart.css";
import axios from "axios";
import AlertAlram from "../../assets/png/alert_alram.png";

// item 객체의 타입을 정의합니다.
interface Item {
  productId: number;
  optionId: number;
  cartId: number;
  brand: string;
  productName: string;
  productPhotoUrl: string;
  price: number;
  finalPrice: number;
  delivery: string;
  quantity?: number;
  option?: string;
}

const CartSummary: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll, items.length]);

  useEffect(() => {
    const total = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        return acc + item.finalPrice * (item.quantity || 1);
      }
      return acc;
    }, 0);
    const deliveryFee = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        if (item.delivery === "무료배송") {
          return acc;
        }
        const itemDeliveryFee = parseInt(item.delivery.replace(/,/g, ""), 10);
        return Math.max(acc, itemDeliveryFee);
      }
      return acc;
    }, 0);
    setTotalPrice(total);
    setTotalDeliveryFee(deliveryFee);
    setFinalPrice(total + deliveryFee);
  }, [checkedItems, items]);

  return (
    <div className="container">
      <div className="cart_wrap">
        <div className="basket_price_info">
          <div className="sum_price">
            총 상품금액
            <span className="tx_num2">{totalPrice.toLocaleString()}</span>원
            <span className="tx_sign plus"> +</span> 배송비
            <span className="tx_num2">{totalDeliveryFee.toLocaleString()}</span>
            원
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
      </div>
    </div>
  );
};

export default CartSummary;
