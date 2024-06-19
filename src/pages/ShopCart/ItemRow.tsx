import React from "react";

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

interface ItemRowProps {
  item: Item;
  index: number;
  checked: boolean;
  onCheckChange: (index: number) => void;
  onDelete: (id: number) => void;
  openModal: (item: Item) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({
  item,
  index,
  checked,
  onCheckChange,
  onDelete,
  openModal,
}) => {
  return (
    <tr key={item.id}>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onCheckChange(index)}
        />
      </td>
      <td>
        <a className="prd_img" href="">
          <img src={item.img} alt={item.name} />
        </a>
        <a className="prd_name" href="">
          <span id="brandName">{item.brand}</span>
          <p id="goodsName">{item.name}</p>
        </a>
      </td>
      <td className="prd_quantity">
        <span id="prd_quantity">{item.quantity || 1}</span>
      </td>
      <td>
        <span className="org_price">
          <span className="tx_num">{item.orgPrice.toLocaleString()}</span>원
        </span>
        <span className="pur_price">
          <span className="tx_num">{item.purPrice.toLocaleString()}</span>원
        </span>
      </td>
      <td>
        <p className="prd_delivery">
          <strong id="deliStrongText">
            {item.delivery}
            <span>도서 · 산간 제외</span>
          </strong>
        </p>
      </td>
      <td>
        <div className="btn_group">
          <button
            type="button"
            className="btnSmall"
            onClick={() => openModal(item)}
          >
            옵션변경
          </button>
          <button
            type="button"
            className="btnSmall delete"
            onClick={() => onDelete(item.id)}
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemRow;
