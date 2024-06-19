import React from "react";
import ItemRow from "./ItemRow";

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

interface CartTableProps {
  items: Item[];
  checkedItems: boolean[];
  handleItemChange: (index: number) => void;
  handleDeleteItem: (id: number) => void;
  openModal: (item: Item) => void;
}

const CartTable: React.FC<CartTableProps> = ({
  items,
  checkedItems,
  handleItemChange,
  handleDeleteItem,
  openModal,
}) => {
  return (
    <table className="cart_table">
      <thead>
        <tr className="table_title">
          <th></th>
          <th scope="col">상품정보</th>
          <th scope="col">수량</th>
          <th scope="col">상품금액</th>
          <th scope="col">배송정보</th>
          <th scope="col">선택</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            index={index}
            checked={checkedItems[index] || false}
            onCheckChange={handleItemChange}
            onDelete={handleDeleteItem}
            openModal={openModal}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
