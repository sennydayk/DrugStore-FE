import React from "react";
import "./CartOpionModal.css";

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

const CartOpionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
}) => {
  // item을 매개변수에서 구조 분해 할당
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [option, setOption] = React.useState(item.option);

  const handleSave = () => {
    onSave(quantity, option);
    onClose();
  };

  const increaseQuantity = () => setQuantity((prev: number) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>옵션수정</h2>
        <div className="cart_option">
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            <option>옵션</option>
            <option>옵션명1</option>
            <option>옵션명2</option>
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
