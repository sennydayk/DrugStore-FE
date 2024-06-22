import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";
import TermsForm from "./TermsAgreement";
import DeliveryInfo from "./DeliveryInfo";
import FinalPaymentInfo from "./FinalPaymentInfo";
import Coupon from "./Coupon";

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
    <div>
      <div className="order_payment_wrap">
        <div className="lefe_area">
          <div className="order_payment_container">
            <h1 className="orderpay_title">주문/결제</h1>
            <DeliveryInfo />
            <div className="delivery_product_container">
              <h2 className="orderpay_subtitle">배송상품</h2>
              <table>
                <caption>배송상품 주문상품 목록</caption>
                <thead>
                  <tr className="orderpay_table_title">
                    <th scope="col">상품정보</th>
                    <th scope="col">상품금액</th>
                    <th scope="col">수량</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <a className="pay_prd_img" href="">
                          <img src={item.img} alt={item.name} />
                        </a>
                        <a className="prd_name" href="">
                          <span id="brandName">{item.brand}</span>
                          <p id="goodsName">{item.name}</p>
                        </a>
                      </td>
                      <td>
                        <span className="org_price">
                          <span className="tx_num">
                            {item.orgPrice.toLocaleString()}
                          </span>
                          원
                        </span>
                        <span className="pur_price">
                          <span className="tx_num">
                            {item.purPrice.toLocaleString()}
                          </span>
                          원
                        </span>
                      </td>
                      <td className="prd_quantity">
                        <span>1</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
