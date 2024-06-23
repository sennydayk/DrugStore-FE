import React, { useState, useEffect } from "react";
import "./ShopCart.css";
import axios from "axios";

// item 객체의 타입을 정의합니다.
interface Item {
  id: number;
  brand: string;
  name: string;
  img: string;
  orgPrice: number;
  purPrice: number;
  delivery: string;
  quantity?: number;
  option?: string;
}

interface ItemOption {
  id: number;
  quantity: number;
  option: string;
}

const CartItem: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [itemOptions, setItemOptions] = useState(
    items.map((item) => ({
      id: item.id,
      quantity: 1,
      option: "",
    }))
  );

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll, items.length]);

  const handleItemChange = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      console.log("사용할 토큰:", token);
      const config = {
        method: "get",
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

  const updateCartItem = async (item: Item) => {
    try {
      await axios.post("https://drugstoreproject.shop/cart", item);
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDeleteItem = (id: number) => {
    // `id`를 기반으로 해당 아이템을 제외한 새 배열 생성
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems); // 상태 업데이트
    // 체크된 아이템 상태도 업데이트
    const updatedCheckedItems = checkedItems.filter(
      (_, index) => index !== items.findIndex((item) => item.id === id)
    );
    setCheckedItems(updatedCheckedItems);
  };

  const handleSaveOptions = (id: number, quantity: number, option: string) => {
    setItemOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, option } : item
      )
    );
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              option,
              name: `${item.name} (${option})`,
              purPrice: (item.purPrice / (item.quantity || 1)) * quantity,
              orgPrice: (item.orgPrice / (item.quantity || 1)) * quantity,
            }
          : item
      )
    );
    const updatedItem = items.find((item) => item.id === id);
    if (updatedItem) {
      updateCartItem(updatedItem);
    }
  };

  // openModal 함수의 매개변수 item에 Item 타입을 지정합니다.
  const openModal = (item: Item) => {
    const currentItemOptions = itemOptions.find(
      (option) => option.id === item.id
    ) || { quantity: 1, option: "" };
    setCurrentItem({ ...item, ...currentItemOptions });
    setIsModalOpen(true);
  };

  return (
    <div className="cart_wrap">
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
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={() => handleItemChange(index)}
                />
              </td>
              <td>
                <a className="prd_img" href="">
                  <img src={item.img} alt={item.name} />
                </a>
                <a className="prd_name" href="">
                  <span id="brandName">{item.brand}</span>
                  <p id="goodsName">{item.name}</p>
                </a>
              </td>
              <td className="prd_quantity">
                <span id="prd_quantity">{item.quantity || 1}</span>
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
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItem;
