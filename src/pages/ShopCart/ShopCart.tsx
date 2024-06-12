import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCart.css";
import Header from "../../components/Header/Header";
import Modal from "./CartOpionModal";
import AlertAlram from "../../assets/png/alert_alram.png";

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

const Cart: React.FC = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      brand: "롬앤",
      name: "롬앤 쥬시 래스팅 틴트(드래곤핑크, 피치미 외)",
      img: "https://image.oliveyoung.co.kr/uploads/images/goods/220/10/0000/0012/A00000012595560ko.jpg?l=ko",
      orgPrice: 9900,
      purPrice: 8400,
      delivery: "2,500",
    },
    {
      id: 2,
      brand: "토리든",
      name: "토리든 다이브인 저분자 히알루론산 세럼 50ml 리필기획(+리필팩 50ml)",
      img: "https://image.oliveyoung.co.kr/uploads/images/goods/10/0000/0018/A00000018926118ko.jpg?l=ko",
      orgPrice: 36000,
      purPrice: 21420,
      delivery: "무료배송",
    },
  ]);
  const goToOrderForm = () => {
    navigate("/order");
  };
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [itemOptions, setItemOptions] = useState(
    items.map((item) => ({
      id: item.id,
      quantity: 1,
      option: "",
    }))
  );

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(selectAll));
  }, [selectAll]);

  const handleItemChange = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  useEffect(() => {
    const total = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        return acc + item.purPrice * (item.quantity || 1);
      }
      return acc;
    }, 0);

    const deliveryFee = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        if (item.delivery === "무료배송") {
          return acc;
        }
        const itemDeliveryFee = parseInt(item.delivery.replace(/,/g, ""), 10);
        return Math.max(acc, itemDeliveryFee);
      }
      return acc;
    }, 0);

    setTotalPrice(total);
    setTotalDeliveryFee(deliveryFee);
    setFinalPrice(total + deliveryFee);
  }, [checkedItems, items]);

  const handleDeleteItem = (id: number) => {
    // `id`를 기반으로 해당 아이템을 제외한 새 배열 생성
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems); // 상태 업데이트

    // 체크된 아이템 상태도 업데이트
    const updatedCheckedItems = checkedItems.filter(
      (_, index) => index !== items.findIndex((item) => item.id === id)
    );
    setCheckedItems(updatedCheckedItems);
  };

  const handleDeleteSelected = () => {
    // 체크되지 않은 아이템들만 필터링
    const remainingItems = items.filter((item, index) => !checkedItems[index]);
    setItems(remainingItems); // 상태 업데이트

    // 체크된 상태도 업데이트
    setCheckedItems(checkedItems.filter((checked) => checked === false));
  };

  const handleSaveOptions = (id: number, quantity: number, option: string) => {
    setItemOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, option } : item
      )
    );
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              option,
              name: `${item.name} (${option})`,
              purPrice: (item.purPrice / (item.quantity || 1)) * quantity,
              orgPrice: (item.orgPrice / (item.quantity || 1)) * quantity,
            }
          : item
      )
    );
  };

  // openModal 함수의 매개변수 item에 Item 타입을 지정합니다.
  const openModal = (item: Item) => {
    const currentItemOptions = itemOptions.find(
      (option) => option.id === item.id
    ) || { quantity: 1, option: "" };
    setCurrentItem({ ...item, ...currentItemOptions });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  return (
    <div className="container">
      <Header />
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
        <table>
          <caption>
            상품정보, 판매가, 수량, 구매가, 배송정보, 선택으로 이루어진 올리브영
            배송상품 장바구니 목록 표
          </caption>
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
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => handleItemChange(index)}
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
                    <span className="tx_num">
                      {item.orgPrice.toLocaleString()}
                    </span>
                    원
                  </span>
                  <span className="pur_price">
                    <span className="tx_num">
                      {item.purPrice.toLocaleString()}
                    </span>
                    원
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
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="basket_price_info">
          <div className="sum_price">
            총 상품금액
            <span className="tx_num2">{totalPrice.toLocaleString()}</span>원
            <span className="tx_sign plus"> +</span> 배송비
            <span className="tx_num2">{totalDeliveryFee.toLocaleString()}</span>
            원
          </div>
          <div className="basket_total_price_info">
            <div className="basket_total_price_alert">
              <img src={AlertAlram} />
              <span className="tx_text">
                결제 시 쿠폰을 적용 받을 경우 금액이 달라질 수 있습니다.
              </span>
            </div>
            <span className="tx_total_price">
              총 결제예상금액
              <span className="tx_price">
                <span className="tx_num3">{finalPrice.toLocaleString()}</span>원
              </span>
            </span>
          </div>
        </div>
        <div className="cart_oreder_btn">
          <button
            type="button"
            className="selectorder_btn"
            onClick={goToOrderForm}
          >
            선택주문
          </button>
          <button
            type="button"
            className="allorder_btn"
            onClick={goToOrderForm}
          >
            전체주문
          </button>
        </div>
      </div>
      {currentItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(quantity: number, option: string) =>
            handleSaveOptions(currentItem.id, quantity, option)
          }
          item={currentItem} // 현재 선택된 아이템의 정보를 전달합니다.
        />
      )}
    </div>
  );
};

export default Cart;
