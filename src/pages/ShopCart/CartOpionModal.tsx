import React, { useState, useEffect } from "react";
import "./CartOpionModal.css";
import axios, { AxiosResponse } from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    options_id: number,
    quantity: number,
    options_name: string,
    options_price: number
  ) => void;
  item: CartItem;
  product_id: number;
}

interface CartItem {
  cart_id: number;
  product_id: number;
  product_name: string;
  brand: string;
  all_options: {
    options_id: number;
    options_name: string;
    options_price: number;
  }[];
  quantity: number;
  price: number;
  product_img: string;
  product_discount: number;
  final_price: number;
  options_id: number;
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
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    item.all_options?.[0]
      ? {
          options_id: item.all_options[0].options_id,
          options_name: item.all_options[0].options_name,
        }
      : null
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

      const config = {
        method: "get",
        url: `https://drugstoreproject.shop/cart`,
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response: AxiosResponse<{ data: CartItem[] }> = await axios(config);
      const productOptions: Option[] = response.data.data
        .filter((item) => item.product_id === product_id)
        .flatMap((item) =>
          item.all_options.map((option) => ({
            options_id: option.options_id,
            options_name: option.options_name,
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
      const token = sessionStorage.getItem("token");
      if (selectedOption) {
        const selectedOptionDetail = item.all_options.find(
          (option) => option.options_id === selectedOption.options_id
        );
        const config = {
          method: "put",
          url: `https://drugstoreproject.shop/cart`,
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
          data: {
            cart_id: item.cart_id,
            product_id: item.product_id,
            product_name: item.product_name,
            brand: item.brand,
            options_id: selectedOption.options_id,
            options_name: selectedOption.options_name,
            all_options: [
              {
                options_id: selectedOption.options_id,
                options_name: selectedOption.options_name,
                options_price: selectedOptionDetail?.options_price || 0,
              },
            ],
            quantity: quantity,
            final_price:
              item.price + (selectedOptionDetail?.options_price || 0),
          },
        };
        await axios(config);
        onSave(
          selectedOption.options_id,
          quantity,
          selectedOption.options_name,
          selectedOptionDetail?.options_price || 0
        );
      }
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
            value={selectedOption?.options_name || ""}
            onChange={(e) => {
              const selectedOption = options.find(
                (option) => option.options_name === e.target.value
              );
              setSelectedOption(selectedOption || null);
            }}
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
