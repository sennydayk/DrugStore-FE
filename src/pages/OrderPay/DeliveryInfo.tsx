import React, { useState, ChangeEvent, FC, useEffect } from "react";
import "./OrderPay.css";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UserInfo {
  user_name: string;
  phone_number: string;
  address: string;
}

const DeliveryInfo: FC = () => {
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      const config: AxiosRequestConfig = {
        method: "post",
        url: "https://drugstoreproject.shop/order/cart-to-order",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };

      const response: AxiosResponse = await axios(config);
      console.log("서버 응답 데이터:", response.data);

      // 서버 응답 데이터 구조에 맞게 userInfo 상태 업데이트
      setUserInfo({
        user_name: response.data.user_name,
        phone_number: response.data.phone_number,
        address: response.data.address,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(`오류 발생: ${error.response.data.message}`);
        } else if (error.request) {
          setErrorMessage("요청을 처리하는 중 오류가 발생했습니다.");
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleDeliveryMessageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeliveryMessage(e.target.value);
  };

  return (
    <div className="order_payment_container">
      <h2 className="orderpay_subtitle">배송지 정보</h2>
      <table className="orderpay_table">
        <caption>주문 정보</caption>
        <tbody>
          {userInfo ? (
            <>
              <tr className="new_order_area">
                <th scope="row">받는분</th>
                <td className="imp_data">{userInfo.user_name}</td>
              </tr>
              <tr className="new_order_area">
                <th scope="row">연락처</th>
                <td className="imp_data">{userInfo.phone_number}</td>
              </tr>
              <tr className="new_order_area">
                <th scope="row">주소</th>
                <td className="imp_data">{userInfo.address}</td>
              </tr>
            </>
          ) : null}
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
