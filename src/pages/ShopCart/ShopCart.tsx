import React, { useState, useEffect } from "react";
import "./ShopCart.css";
import axios from "axios";
import Modal from "./CartOpionModal";
import CartItem from "./CartItem";

// item 객체의 타입을 정의합니다.
interface Item {
  productId: number;
  optionId: number;
  cartId: number;
  brand: string;
  productName: string;
  productPhotoUrl: string;
  price: number;
  finalPrice: number;
  delivery: string;
  quantity?: number;
  option?: string;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemOptions, setItemOptions] = useState(
    items.map((item) => ({
      id: item.productId,
      quantity: 1,
      option: "",
    }))
  );

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll, items.length]);

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

  const updateCartItem = async (item: Item) => {
    try {
      await axios.post("https://drugstoreproject.shop/cart", item);
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDeleteItem = (id: number) => {
    // `id`를 기반으로 해당 아이템을 제외한 새 배열 생성
    const filteredItems = items.filter((item) => item.productId !== id);
    setItems(filteredItems); // 상태 업데이트

    // 체크된 아이템 상태도 업데이트
    const updatedCheckedItems = checkedItems.filter(
      (_, index) => index !== items.findIndex((item) => item.productId === id)
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
        item.productId === id
          ? {
              ...item,
              quantity,
              option,
              name: `${item.productName} (${option})`,
              purPrice: (item.finalPrice / (item.quantity || 1)) * quantity,
              orgPrice: (item.price / (item.quantity || 1)) * quantity,
            }
          : item
      )
    );
    const updatedItem = items.find((item) => item.productId === id);
    if (updatedItem) {
      updateCartItem(updatedItem);
    }
  };

  return (
    <div className="container">
      <div className="cart_wrap">
        <CartItem />
      </div>
      {currentItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(quantity: number, option: string) =>
            handleSaveOptions(currentItem.id, quantity, option)
          }
          item={currentItem} // 현재 선택된 아이템의 정보를 전달합니다.
          product_id={currentItem.id}
        />
      )}
    </div>
  );
};

export default Cart;
