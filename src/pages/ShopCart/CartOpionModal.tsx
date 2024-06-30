import React, { useState, useEffect } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (options_id: number, quantity: number, options_name: string) => void;
  item: CartItem;
}

interface CartItem {
  cart_id: number;
  product_id: number;
  product_name: string;
  brand: string;
  options_id: number;
  options_name: string;
  all_options_names: string[];
  options_price: number;
  quantity: number;
  price: number;
  product_img: string;
  product_discount: number;
  final_price: number;
}

interface Option {
  options_id: number;
  options_name: string;
}

const CartOptionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [selectedOption, setSelectedOption] = useState<string>(
    item.options_name
  );
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchOptions(item.product_id);
    }
  }, [isOpen, item.product_id]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const fetchOptions = async (product_id: number) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const config = {
        method: "get",
        url: `https://drugstoreproject.shop/cart`,
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response: AxiosResponse<{ data: CartItem[] }> = await axios(config);
      const productOptions = response.data.data
        .filter((item) => item.product_id === product_id)
        .flatMap((item) =>
          item.all_options_names.map((optionName) => ({
            options_id: item.options_id,
            options_name: optionName,
          }))
        );
      setOptions(productOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      const selectedOptionId = options.find(
        (option) => option.options_name === selectedOption
      )?.options_id;
      if (selectedOptionId === undefined) {
        throw new Error("선택된 옵션의 ID를 찾을 수 없습니다.");
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      const config = {
        method: "put",
        url: `https://drugstoreproject.shop/cart`,
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        data: {
          cart_id: item.cart_id,
          options_id: selectedOptionId,
          quantity: quantity,
          options_name: selectedOption,
        },
      };

      await axios(config);
      onSave(selectedOptionId, quantity, selectedOption);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>옵션 변경</h2>
        <div className="cart_option">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.options_id} value={option.options_name}>
                {option.options_name}
              </option>
            ))}
          </select>
        </div>
        <div className="quantity-input">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            readOnly
            min={1}
          />
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <div className="check_close_btn">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>선택완료</button>
        </div>
      </div>
    </div>
  );
};

export default CartOptionModal;
