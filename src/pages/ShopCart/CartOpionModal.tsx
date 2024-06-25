import React, { useState } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quantity: number, option: string) => void;
  item: CartItem;
}

interface CartItem {
  cartId: number;
  name: string;
  quantity: number;
  option_id: number;
  option: string;
  option_price: number;
}

interface UpdateCartItemRequest {
  cartId: number;
  quantity: number;
  option_id: number;
  option: string;
  option_price: number;
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

  const updateCartItem = async (
    item: CartItem
  ): Promise<AxiosResponse<CartItem>> => {
    const requestBody: UpdateCartItemRequest = {
      cartId: item.cartId,
      option: option.value,
      option_id: item.option_id,
      option_price: item.option_price,
      quantity: quantity,
    };

    const response = await axios.put<CartItem>(
      "https://drugstoreproject.shop/cart",
      requestBody
    );
    return response;
  };

  const handleSave = async () => {
    await updateCartItem({ ...item, quantity, option: option.value });
    onSave(quantity, option.value);
    onClose();
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
            onChange={(e) => setOption({ ...option, value: e.target.value })}
          >
            <option>{option.value}</option>
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
