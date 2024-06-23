import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const CartActions: React.FC = () => {
  let navigate = useNavigate();
  const goToOrderForm = () => {
    navigate("/order");
  };
  const [items, setItems] = useState<Item[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll, items.length]);

  const updateCartItem = async (item: Item) => {
    try {
      await axios.post("https://drugstoreproject.shop/cart/update", item);
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

  const handleDeleteSelected = () => {
    // 체크되지 않은 아이템들만 필터링
    const remainingItems = items.filter((item, index) => !checkedItems[index]);
    setItems(remainingItems); // 상태 업데이트

    // 체크된 상태도 업데이트
    setCheckedItems(checkedItems.filter((checked) => checked === false));
  };

  return (
    <div className="container">
      <div className="cart_wrap">
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
    </div>
  );
};

export default CartActions;
