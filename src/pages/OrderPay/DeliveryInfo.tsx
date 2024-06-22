import React, { useState, ChangeEvent, FC, useEffect } from "react";
import "./OrderPay.css";
import axios from "axios";

interface UserInfo {
  name: string;
  phoneNumber: string;
  address: string;
}

const DeliveryInfo: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");

  const handleDeliveryMessageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeliveryMessage(e.target.value);
  };

  return (
    <div className="order_payment_container">
      <h2 className="orderpay_subtitle">배송지 정보</h2>
      <table className="orderpay_table">
        <caption>주문 정보</caption>
        <tbody>
          {userInfo.map((user, index) => (
            <React.Fragment key={index}>
              <tr className="new_order_area">
                <th scope="row">받는분</th>
                <td className="imp_data">{user.name}</td>
              </tr>
              <tr className="new_order_area">
                <th scope="row">연락처</th>
                <td className="imp_data">{user.phoneNumber}</td>
              </tr>
              <tr className="new_order_area">
                <th scope="row">주소</th>
                <td className="imp_data">{user.address}</td>
              </tr>
            </React.Fragment>
          ))}
          <tr className="new_order_area">
            <th scope="row">배송 메시지</th>
            <td className="imp_data">
              <select
                className="delivery_select"
                value={deliveryMessage}
                onChange={handleDeliveryMessageChange}
              >
                <option value="">배송메시지를 선택해주세요.</option>
                <option value="부재 시 경비실에 맡겨주세요.">
                  부재 시 경비실에 맡겨주세요.
                </option>
                <option value="부재 시 문 앞에 맡겨주세요.">
                  부재 시 문 앞에 맡겨주세요.
                </option>
                <option value="파손의 위험이 있는 상품이오니, 배송 시 주의해주세요">
                  파손의 위험이 있는 상품이오니, 배송 시 주의해주세요
                </option>
                <option value="배송 전에 연락주세요.">
                  배송 전에 연락주세요.
                </option>
                <option value="택배함에 넣어주세요.">
                  택배함에 넣어주세요.
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryInfo;
