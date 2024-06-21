import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCart.css";
import axios from "axios";
import Modal from "./CartOpionModal";
import AlertAlram from "../../assets/png/alert_alram.png";

// item 객체의 타입을 정의합니다.
interface Item {
  product_id: number;
  cart_id: number;
  brand_name: string;
  product_name: string;
  product_img: string;
  price: number;
  f_price: number;
  delivery: string;
  quantity?: number;
  option?: string;
}

const Cart: React.FC = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const goToOrderForm = () => {
    navigate("/order");
  };
  const [itemOptions, setItemOptions] = useState(
    items.map((item) => ({
      id: item.product_id,
      quantity: 1,
      option: "",
    }))
  );

  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      console.log("사용할 토큰:", token);
      const config = {
        method: "get", // HTTP 메서드
        url: "https://drugstoreproject.shop/cart",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response = await axios(config);
      console.log("서버 응답 데이터:", response.data);
      setItems(response.data.data);
      setCheckedItems(new Array(response.data.data.length).fill(false));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "장바구니 데이터를 가져오는 중 오류 발생:",
          error.message
        );
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태 코드:", error.response.status);
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
    }
  };

  const addItemToCart = async (item: Item) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const config = {
        method: "post",
        url: "http://drugstoreproject.shop/cart",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        data: item,
      };
      const response = await axios(config);
      console.log("항목 추가 응답 데이터:", response.data);
      fetchCartItems(); // 장바구니 항목 다시 불러오기
    } catch (error) {
      console.error("항목 추가 중 오류 발생:", error);
    }
  };

  const updateCartItem = async (cartId: number, updatedItem: Partial<Item>) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const config = {
        method: "put",
        url: `http://drugstoreproject.shop/cart/${cartId}`,
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        data: updatedItem,
      };
      const response = await axios(config);
      console.log("항목 수정 응답 데이터:", response.data);
      fetchCartItems(); // 장바구니 항목 다시 불러오기
    } catch (error) {
      console.error("항목 수정 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll]);

  const handleItemChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    const total = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        return acc + item.f_price * (item.quantity || 1);
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

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`http://drugstoreproject.shop/cart/${id}`);
      // 아이템을 삭제한 후, 상태를 업데이트
      setItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== id)
      );
      setCheckedItems((prevChecked) =>
        prevChecked.filter(
          (_, index) =>
            index !== items.findIndex((item) => item.product_id === id)
        )
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedItems = items.filter((_, index) => checkedItems[index]);
      const deleteRequests = selectedItems.map((item) =>
        axios.delete(`http://drugstoreproject.shop/cart/${item.product_id}`)
      );
      await Promise.all(deleteRequests);
      // 선택된 아이템 삭제 후, 상태 업데이트
      setItems((prevItems) =>
        prevItems.filter((_, index) => !checkedItems[index])
      );
      setCheckedItems((prevChecked) =>
        prevChecked.filter((checked) => !checked)
      );
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  const handleSaveOptions = (id: number, quantity: number, option: string) => {
    setItemOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, option } : item
      )
    );
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id
          ? {
              ...item,
              quantity,
              option,
              name: `${item.product_name} (${option})`,
              purPrice: (item.f_price / (item.quantity || 1)) * quantity,
              orgPrice: (item.price / (item.quantity || 1)) * quantity,
            }
          : item
      )
    );
  };

  // openModal 함수의 매개변수 item에 Item 타입을 지정합니다.
  const openModal = (item: Item) => {
    const currentItemOptions = itemOptions.find(
      (option) => option.id === item.product_id
    ) || { quantity: 1, option: "" };
    setCurrentItem({ ...item, ...currentItemOptions });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  return (
    <div className="container">
      <div className="cart_wrap">
        <h1 className="shopcart_title">장바구니</h1>
        <h3>배송상품</h3>
        <div className="cart-check">
          <div className="checkbox-label-group">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
              id="inp_allRe1"
              title="올리브영 배송상품 전체 선택"
            />
            <label htmlFor="inp_allRe1">전체 선택</label>
          </div>
          <button type="button" onClick={handleDeleteSelected}>
            선택상품 삭제
          </button>
        </div>
        <table className="cart_table">
          <caption>
            상품정보, 판매가, 수량, 구매가, 배송정보, 선택으로 이루어진 올리브영
            배송상품 장바구니 목록 표
          </caption>
          <thead>
            <tr className="table_title">
              <th></th>
              <th scope="col">상품정보</th>
              <th scope="col">수량</th>
              <th scope="col">상품금액</th>
              <th scope="col">배송정보</th>
              <th scope="col">선택</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.product_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[index] || false}
                      onChange={() => handleItemChange(index)}
                    />
                  </td>
                  <td>
                    <a className="prd_img" href="">
                      <img src={item.product_img} alt={item.product_name} />
                    </a>
                    <a className="prd_name" href="">
                      <span id="brandName">{item.brand_name}</span>
                      <p id="goodsName">{item.product_name}</p>
                    </a>
                  </td>
                  <td className="prd_quantity">
                    <span id="prd_quantity">{item.quantity || 1}</span>
                  </td>
                  <td>
                    <span className="org_price">
                      <span className="tx_num">
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      원
                    </span>
                    <span className="pur_price">
                      <span className="tx_num">{item.f_price}</span>원
                    </span>
                  </td>
                  <td>
                    <p className="prd_delivery">
                      <strong id="deliStrongText">
                        {item.delivery}
                        <span>도서 · 산간 제외</span>
                      </strong>
                    </p>
                  </td>
                  <td>
                    <div className="btn_group">
                      <button
                        type="button"
                        className="btnSmall"
                        onClick={() => openModal(item)}
                      >
                        옵션변경
                      </button>
                      <button
                        type="button"
                        className="btnSmall delete"
                        onClick={() => handleDeleteItem(item.product_id)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>장바구니가 비어 있습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="basket_price_info">
          <div className="sum_price">
            총 상품금액
            <span className="tx_num2">{totalPrice.toLocaleString()}</span>원
            <span className="tx_sign plus"> +</span> 배송비
            <span className="tx_num2">{totalDeliveryFee}</span>원
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
                <span className="tx_num3">{finalPrice}</span>원
              </span>
            </span>
          </div>
        </div>
        <div className="cart_oreder_btn">
          <button
            type="button"
            className="selectorder_btn"
            onClick={goToOrderForm}
          >
            선택주문
          </button>
          <button
            type="button"
            className="allorder_btn"
            onClick={goToOrderForm}
          >
            전체주문
          </button>
        </div>
      </div>
      {currentItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(quantity: number, option: string) =>
            handleSaveOptions(currentItem.id, quantity, option)
          }
          item={currentItem} // 현재 선택된 아이템의 정보를 전달합니다.
        />
      )}
    </div>
  );
};

export default Cart;
