import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCart.css";
import axios, { AxiosError } from "axios";
import Modal from "./CartOpionModal";
import AlertAlram from "../../assets/png/alert_alram.png";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import CartControls from "./CartControls";

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

const Cart: React.FC = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const goToOrderForm = () => {
    navigate("/order");
  };
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [itemOptions, setItemOptions] = useState(
    items.map((item) => ({
      id: item.id,
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

      const response = await axios.get(
        "https://drugstoreproject.shop/cart/myCart",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("장바구니 데이터를 가져오는 중 오류 발생:", error);
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태 코드:", error.response.status);
        }
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
    }
  };

  const addItemToCart = async (item: Item) => {
    try {
      const response = await axios.post(
        "https://drugstoreproject.shop/cart/add",
        item
      );
      // 성공적으로 추가되면 장바구니 항목을 다시 가져옵니다.
      fetchCartItems();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("장바구니에 항목을 추가하는 중 오류 발생:", axiosError);
      if (axiosError.response) {
        console.error("서버 응답 데이터:", axiosError.response.data);
        console.error("서버 응답 상태 코드:", axiosError.response.status);
      }
    }
  };

  const updateItemInCart = async (
    id: number,
    quantity: number,
    option: string
  ) => {
    try {
      const response = await axios.put(
        "https://drugstoreproject.shop/cart/update",
        { id, quantity, option }
      );
      // 성공적으로 업데이트되면 장바구니 항목을 다시 가져옵니다.
      fetchCartItems();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("장바구니 항목을 업데이트하는 중 오류 발생:", axiosError);
      if (axiosError.response) {
        console.error("서버 응답 데이터:", axiosError.response.data);
        console.error("서버 응답 상태 코드:", axiosError.response.status);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll]);

  const handleItemChange = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  useEffect(() => {
    const total = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        return acc + item.purPrice * (item.quantity || 1);
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
  };

  // openModal 함수의 매개변수 item에 Item 타입을 지정합니다.
  const openModal = (item: Item) => {
    const currentItemOptions = itemOptions.find(
      (option) => option.id === item.id
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
      <h1 className="shopcart_title">장바구니</h1>
      <h3 className="shopcart_subtitle">배송상품</h3>
      <div className="cart_wrap">
        <CartControls
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          handleDeleteSelected={handleDeleteSelected}
          goToOrderForm={goToOrderForm}
        />
        <CartTable
          items={items}
          checkedItems={checkedItems}
          handleItemChange={handleItemChange}
          handleDeleteItem={handleDeleteItem}
          openModal={openModal}
        />
        <CartSummary
          totalPrice={totalPrice}
          totalDeliveryFee={totalDeliveryFee}
          finalPrice={finalPrice}
        />
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
