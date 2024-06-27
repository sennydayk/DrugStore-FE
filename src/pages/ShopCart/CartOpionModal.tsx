import React, { useState, useEffect } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, option: string) => void;
  item: CartItem;
  product_id: number;
}

interface CartItem {
  cart_id: number;
  name: string;
  quantity: number;
  options_id: number;
  option: string;
  option_price: number;
  options_name: string;
}

interface UpdateCartItemRequest {
  cart_id: number;
  options_id: number;
  quantity: number;
}

interface Option {
  value: string;
  option: string;
  options_id: number;
  options_name: string;
}

const CartOpionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  product_id,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [option, setOption] = useState<Option>({
    value: item.option,
    option: item.option,
    options_name: item.options_name,
    options_id: item.options_id,
  });
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (product_id) {
      fetchOptions(product_id);
    }
  }, [product_id]);

  const fetchOptions = async (product_id: number) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      if (!product_id) {
        throw new Error("product_id가 정의되지 않았습니다.");
      }
      const config = {
        method: "get",
        url: `https://drugstoreproject.shop/cart/options/${product_id}`,
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response: AxiosResponse<{ options: Option[] }> = await axios(
        config
      );
      setOptions(response.data.options);
    } catch (error) {
      console.error("Error fetching options:", error);
      throw error;
    }
  };

  const updateCartItem = async (updatedItem: UpdateCartItemRequest) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      const config = {
        method: "put",
        url: "https://drugstoreproject.shop/cart",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        data: updatedItem,
      };
      const response: AxiosResponse<CartItem> = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      const updatedItem = await updateCartItem({
        cart_id: item.cart_id,
        options_id: option.options_id,
        quantity,
      });
      onSave(updatedItem.quantity, updatedItem.option);
      onClose();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const increaseQuantity = () => setQuantity((prev: number) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>옵션 변경</h2>
        <div className="cart_option">
          <select
            value={option.value}
            onChange={(e) =>
              setOption(
                options.find((o) => o.value === e.target.value) || option
              )
            }
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.options_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="quantity-input">
            <button onClick={decreaseQuantity}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              readOnly
              min={1}
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <div className="check_close_btn">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>선택완료</button>
        </div>
      </div>
    </div>
  );
};

export default CartOpionModal;
