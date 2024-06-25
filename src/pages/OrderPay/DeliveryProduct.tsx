import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import "./OrderPay.css";

interface Item {
  productId: number;
  optionId: number;
  cartId: number;
  brand: string;
  product_name: string;
  product_photo: string;
  price: number;
  finalPrice: number;
  delivery: string;
  quantity: number;
  option: string;
}

const DeliveryProduct: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchCartToOrder = async () => {
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

      const response: AxiosResponse<Item[]> = await axios(config);
      console.log("서버 응답 데이터:", response.data);
      setItems(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`오류 발생: ${error.response.data.message}`);
        } else if (error.request) {
          console.error("요청을 처리하는 중 오류가 발생했습니다.");
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        console.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    fetchCartToOrder();
  }, []);

  return (
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
          {items.length > 0
            ? items.map((item, index) => (
                <tr key={item.cartId}>
                  <td>
                    <a className="pay_prd_img" href="">
                      <img src={item.product_photo} alt={item.product_name} />
                    </a>
                    <a className="prd_name" href="">
                      <span id="brandName">{item.brand}</span>
                      <p id="goodsName">{item.product_name}</p>
                    </a>
                  </td>
                  <td>
                    <span className="org_price">
                      <span className="tx_num">
                        {item.price.toLocaleString()}
                      </span>
                      원
                    </span>
                    <span className="pur_price">
                      <span className="tx_num">
                        {item.finalPrice.toLocaleString()}
                      </span>
                      원
                    </span>
                  </td>
                  <td className="prd_quantity">
                    <span>{item.quantity.toLocaleString()}</span>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryProduct;
