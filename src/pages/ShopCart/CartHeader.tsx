import React, { useState, useEffect } from "react";
import "./ShopCart.css";

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

const CartHeader: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll, items.length]);

  const handleDeleteSelected = () => {
    // 체크되지 않은 아이템들만 필터링
    const remainingItems = items.filter((item, index) => !checkedItems[index]);
    setItems(remainingItems); // 상태 업데이트

    // 체크된 상태도 업데이트
    setCheckedItems(checkedItems.filter((checked) => checked === false));
  };

  return (
    <div className="cart_wrap">
      <h1 className="shopcart_title">장바구니</h1>
      <h3>배송상품</h3>
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
    </div>
  );
};

export default CartHeader;
