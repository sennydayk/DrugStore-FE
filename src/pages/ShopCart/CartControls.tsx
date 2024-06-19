import React from "react";

interface CartControlsProps {
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  handleDeleteSelected: () => void;
  goToOrderForm: () => void;
}

const CartControls: React.FC<CartControlsProps> = ({
  selectAll,
  setSelectAll,
  handleDeleteSelected,
  goToOrderForm,
}) => {
  return (
    <div className="cart-check">
      <div className="checkbox-label-group">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={() => setSelectAll(!selectAll)}
          id="inp_allRe1"
          title="올리브영 배송상품 전체 선택"
        />
        <label htmlFor="inp_allRe1">전체 선택</label>
      </div>
      <button type="button" onClick={handleDeleteSelected}>
        선택상품 삭제
      </button>
    </div>
  );
};

export default CartControls;
