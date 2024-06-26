import React, { useState, ChangeEvent, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import "./OrderPay.css";

interface OrderData {
  coupon_id: number;
  coupon_name: string;
  coupon_discount: number;
}

interface OrderFormProps {}

interface CouponProps {
  onCouponChange: (coupon: OrderData | null) => void;
}

const Coupon: React.FC<CouponProps> = ({ onCouponChange }) => {
  const [selectedCoupon, setSelectedCoupon] = useState<OrderData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderData, setOrderData] = useState<OrderData[]>([]);

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
            coupon_id: selectedCoupon?.coupon_id || null,
          },
        };

        const response: AxiosResponse = await axios(config);
        setOrderData(response.data.data.order_coupon_list);
        console.log("orderData", orderData);
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
    const selectedCoupon = orderData.find(
      (coupon) => coupon.coupon_id === selectedCouponId
    );
    setSelectedCoupon(selectedCoupon || null);
    onCouponChange(selectedCoupon || null);
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
          coupon_id: selectedCoupon?.coupon_id,
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
          value={selectedCoupon?.coupon_id || "사용안함"}
          onChange={handleCouponChange}
        >
          <option value="사용안함">사용안함</option>
          {orderData?.map((coupon) => (
            <option key={coupon.coupon_id} value={coupon.coupon_id}>
              {coupon.coupon_name}
            </option>
          ))}
        </select>
        <button onClick={applyCoupon} className="orderpay_couponbtn">
          쿠폰 적용
        </button>
      </div>
    </div>
  );
};

export default Coupon;
