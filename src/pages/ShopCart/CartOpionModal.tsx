import React, { useState, useEffect } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, option: string) => void;
  item: {
    id: number;
    quantity: number;
    option: string;
  };
}

interface Option {
  value: string;
  option: string;
}

const CartOpionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [option, setOption] = useState<Option>({
    value: item.option,
    option: item.option,
  });

  const increaseQuantity = () => setQuantity((prev: number) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
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

    fetchCartItems();
  }, []);

  const handleSave = async () => {
    try {
      const response: AxiosResponse = await axios.put(
        "https://drugstoreproject.shop/cart",
        {
          id: item.id,
          quantity,
          option: option.option,
        }
      );
      onSave(quantity, option.option);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <div className="cart_option">
      <select
        value={option.value}
        onChange={(e) =>
          setOption({
            ...option,
            value: e.target.value,
            option: e.target.value,
          })
        }
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CartOpionModal;
