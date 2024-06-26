import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./OrderPay.css";
import axios from "axios";

interface Item {
  cart_Id: number;
  product_Id: number;
  brand: string;
  product_name: string;
  product_img: string;
  price: number;
  final_price: number;
  quantity: number;
  option_name: string;
}

interface OrderData {
  coupon_id: number;
  coupon_name: string;
  coupon_discount: number;
}

interface FinalPaymentInfoProps {
  selectedCoupon: OrderData | null;
}

const FinalPaymentInfo: React.FC<FinalPaymentInfoProps> = ({
  selectedCoupon,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [totalProductAmount, setTotalProductAmount] = useState<number>(0);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);

  const fetchCartToOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const response = await axios.post(
        "https://drugstoreproject.shop/order/cart-to-order",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      setItems(response.data.data.order_product_list);
      calculatePaymentInfo(response.data.data.order_product_list);
    } catch (error) {
      // 에러 처리 로직
    }
  };

  const calculatePaymentInfo = (items: Item[]) => {
    let totalProductAmount = 0;
    let couponDiscount = 0;

    items.forEach((item) => {
      totalProductAmount += item.final_price * item.quantity;
      if (selectedCoupon) {
        couponDiscount +=
          item.final_price *
          (selectedCoupon.coupon_discount / 100) *
          item.quantity;
      }
    });

    setTotalProductAmount(totalProductAmount);
    setCouponDiscount(couponDiscount);
    setTotalPaymentAmount(
      totalProductAmount - (selectedCoupon ? couponDiscount : 0)
    );
  };

  const handlePayment = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      const paymentData = {
        option_quantity_dto: items.map((item) => ({
          option_id: item.cart_Id,
          quantity: item.quantity,
        })),
        total_price: totalPaymentAmount,
      };

      await axios.put(
        "https://drugstoreproject.shop/order/order-to-pay",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      alert("결제가 되었습니다.");
      navigate("/mypage/purchase-history");
    } catch (error) {
      // 에러 처리 로직
    }
  };

  useEffect(() => {
    fetchCartToOrder();
  }, []);

  useEffect(() => {
    calculatePaymentInfo(items);
  }, [items, selectedCoupon]);

  return (
    <div className="order_payment_wrap">
      <div className="right_area">
        <h2 className="orderpay_subtitle2">최종 결제정보</h2>
        <ul className="total_payment_box">
          <li>
            <span className="tx_tit">총 상품금액</span>
            <span className="tx_cont">
              <span className="tx_num">
                {totalProductAmount.toLocaleString()}
              </span>
              원
            </span>
          </li>
          <li>
            <span className="tx_tit">쿠폰 할인금액</span>
            <span className="tx_cont">
              <span className="tx_num" id="totDscntAmt_span">
                {couponDiscount.toLocaleString()}
              </span>
              원
            </span>
          </li>
          <li>
            <span className="tx_tit">총 배송비</span>
            <span className="tx_cont">
              <span className="tx_num" id="dlexPayAmt_span">
                0
              </span>
              원
            </span>
          </li>
          <li className="total">
            <span className="tx_tit">최종 결제금액</span>
            <span className="tx_cont">
              <span className="tx_num" id="totPayAmt_sum_span">
                {totalPaymentAmount.toLocaleString()}
              </span>
              원
            </span>
          </li>
          <li>
            <button
              className="btnPayment"
              id="btnPay"
              name="btnPay"
              type="button"
              onClick={handlePayment}
            >
              결제하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FinalPaymentInfo;
