import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";

const OrderForm: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [items, setItems] = useState([
    {
      id: 1,
      brand: "롬앤",
      name: "[단종컬러 재출]롬앤 쥬시 래스팅 틴트(드래곤핑크, 피치미 외)",
      img: "https://image.oliveyoung.co.kr/uploads/images/goods/220/10/0000/0012/A00000012595560ko.jpg?l=ko",
      orgPrice: 9900,
      purPrice: 8400,
      delivery: "2,500",
    },
  ]);

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  return (
    <div className="coupon_container">
      <h2 className="orderpay_subtitle">쿠폰</h2>
      <div className="coupon_wrap">
        <p>쿠폰 적용</p>
        <select className="coupon_select">
          <option value={"사용안함"}>사용안함</option>
          <option value={"30%할인"}>30% 할인쿠폰</option>
        </select>
      </div>
    </div>
  );
};

export default OrderForm;
