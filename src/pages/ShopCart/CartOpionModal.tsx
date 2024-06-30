import React, { useState, useEffect } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, option_name: string) => void;
  item: CartItem;
  product_id: number;
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
  product_id,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [selectedOption, setSelectedOption] = useState<string>(
    item.options_name
  );

  const [options, setOptions] = useState<Option[]>([]);
  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const fetchOptions = async () => {
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
      const currentItem = response.data.data.find(
        (cartItem) => cartItem.product_id === item.product_id
      );
      if (currentItem) {
        const allOptions = currentItem.all_options_names.map((optionName) => ({
          options_id: currentItem.options_id,  /*id 받아오면 여기서 currentitem이 아니라 all_options_names에 해당하는 id로 변경 */
          options_name: optionName,
        }));
        setOptions(allOptions);
        console.log(options)
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      throw error;
    }
  };

  const updateCartOption = async (
    cart_id: number,
    options_id: number,
    quantity: number,
    options_name: string
  ) => {
    try {
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
          cart_id: cart_id,
          options_id: options_id,
          quantity: quantity,
          options_name: options_name,
        },
      };
      const response = await axios(config);
      console.log("Update response:", response.data);
    } catch (error) {
      console.error("Error updating cart option:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const handleSave = async () => {
    const selectedOptionObj = options.find(
      (option) => option.options_name.trim() === selectedOption
    );
    if (selectedOptionObj) {
      await updateCartOption(
        item.cart_id,
        selectedOptionObj.options_id,
        quantity,
        selectedOptionObj.options_name
      );
      onSave(quantity, selectedOptionObj.options_name);
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
            {item.all_options_names.map((option) => (
              <option >
                {option}
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
