import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./OrderPay.css";

interface Item {
  cart_id: number;
  brand_name: string;
  product_name: string;
  product_id: number;
  product_img: string;
  price: string;
  final_price: string;
  delivery: string;
}

const DeliveryProduct: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      cart_id: 0,
      brand_name: "",
      product_name: "",
      product_id: 0,
      product_img: "",
      price: "",
      final_price: "",
      delivery: "",
    },
  ]);

  const fetchCartToOrder = async () => {
    try {
      const response: AxiosResponse<Item[]> = await axios.post(
        "https://drugstoreproject.shop/order/cart-to-order"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching cart-to-order data:", error);
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
          {items.map((item, index) => (
            <tr key={item.cart_id}>
              <td>
                <a className="pay_prd_img" href="">
                  <img src={item.product_img} alt={item.product_name} />
                </a>
                <a className="prd_name" href="">
                  <span id="brandName">{item.brand_name}</span>
                  <p id="goodsName">{item.product_name}</p>
                </a>
              </td>
              <td>
                <span className="org_price">
                  <span className="tx_num">{item.price.toLocaleString()}</span>
                  원
                </span>
                <span className="pur_price">
                  <span className="tx_num">
                    {item.final_price.toLocaleString()}
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
  );
};

export default DeliveryProduct;
