import React, { useState, ChangeEvent, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import "./OrderPay.css";

interface OrderData {
  order_coupon_list: {
    id: number;
    coupon_name: string;
    discount_rate: number;
  }[];
}

interface OrderFormProps {}

const Coupon: React.FC<OrderFormProps> = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [selectedCoupon, setSelectedCoupon] = useState<{
    id: number;
    discount_rate: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderData, setOrderData] = useState<OrderData>({
    order_coupon_list: [],
  });

  useEffect(() => {
    const fetchCouponData = async () => {
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
          data: {
            coupon_id: selectedCoupon?.id || null,
          },
        };

        const response: AxiosResponse = await axios(config);
        setOrderData(response.data);
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

    fetchCouponData();
  }, [selectedCoupon]);

  const handleCouponChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCouponId = parseInt(event.target.value);
    const selectedCoupon = orderData.order_coupon_list.find(
      (coupon) => coupon.id === selectedCouponId
    );
    setSelectedCoupon(selectedCoupon || null);
  };

  const applyCoupon = async () => {
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
        data: {
          coupon_id: selectedCoupon?.id,
        },
      };

      const response: AxiosResponse = await axios(config);
      console.log("쿠폰 적용 결과:", response.data);
      // 쿠폰 적용 성공 시 추가 로직 작성
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

  return (
    <div className="coupon_container">
      <h2 className="orderpay_subtitle">쿠폰</h2>
      <div className="coupon_wrap">
        <p>사용 가능한 쿠폰</p>
        <select
          className="coupon_select"
          value={selectedCoupon?.id || "사용안함"}
          onChange={handleCouponChange}
        >
          <option value="사용안함">사용안함</option>
          {orderData.order_coupon_list?.map((coupon) => (
            <option key={coupon.id} value={coupon.id}>
              {coupon.coupon_name}
            </option>
          ))}
        </select>

        <button onClick={applyCoupon} className="orderpay_couponbtn">
          쿠폰 적용
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Coupon;
