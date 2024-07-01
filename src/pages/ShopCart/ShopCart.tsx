import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCart.css";
import axios, { AxiosResponse } from "axios";
import CartOptionModal from "./CartOpionModal";
import AlertAlram from "../../assets/png/alert_alram.png";

interface Item {
  product_id: number;
  options_id: number;
  cart_id: number;
  brand: string;
  product_name: string;
  product_img: string;
  price: number;
  final_price: number;
  quantity?: number;
  option: string;
  options_name: string;
}

const CartItem: React.FC = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [itemOptions, setItemOptions] = useState<
    { option_id: number; quantity: number; option_name: string }[]
  >([]);
  const [currentItemOptions, setCurrentItemOptions] = useState<{
    quantity: number;
    option_name: string;
  }>({ quantity: 1, option_name: "" });

  const goToOrderForm = () => {
    navigate("/order");
  };

  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      console.log("사용할 토큰:", token);
      const config = {
        method: "get",
        url: "https://drugstoreproject.shop/cart",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };
      const response = await axios(config);
      console.log("서버 응답 데이터:", response.data);
      setItems(response.data.data);
      setCheckedItems(new Array(response.data.data.length).fill(false));
      setCartItemCount(response.data.data.length);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "장바구니 데이터를 가져오는 중 오류 발생:",
          error.message
        );
        if (error.response) {
          console.error("cart get서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태 코드:", error.response.status);
          if (error.response.status === 404) {
            // 장바구니가 비어있는 경우
            setItems([]);
            setCheckedItems([]);
            setCartItemCount(0);
          }
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => {
      const newCheckedItems = items.map(() => !prevSelectAll);
      setCheckedItems(newCheckedItems);
      return !prevSelectAll;
    });
  };

  useEffect(() => {
    const total = items.reduce((acc, item, index) => {
      if (checkedItems[index]) {
        return acc + item.final_price * (item.quantity || 1);
      }
      return acc;
    }, 0);
    setTotalPrice(total);
    setFinalPrice(total);
  }, [checkedItems, items]);

  const handleDeleteItem = async (item: Item) => {
    try {
      const token = sessionStorage.getItem("token");
      const response: AxiosResponse<any> = await axios.delete(
        `https://drugstoreproject.shop/cart/${item.cart_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
          data: {
            data: [item.cart_id],
          },
        }
      );

      if (response.status === 200) {
        // 장바구니에서 상품 삭제 성공
        // 장바구니 목록 업데이트
        setItems(items.filter((i) => i.product_id !== item.product_id));
      } else {
        // 장바구니에서 상품 삭제 실패
        console.error("장바구니 상품 삭제 실패:", response.data);
      }
    } catch (error) {
      console.error("장바구니 상품 삭제 중 오류 발생:", error);
    }
  };

  const handleAllDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      const config = {
        method: "delete",
        url: "https://drugstoreproject.shop/cart/empty",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      };

      await axios(config);

      // 장바구니의 모든 상품을 state에서 제거
      setItems([]);
      setCheckedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  const handleSave = (
    options_id: number,
    quantity: number,
    options_name: string,
    optionPrice: number
  ) => {
    setCurrentItem((prevItem: Item | null) => ({
      ...prevItem,
      quantity,
      options_name,
      final_price: prevItem?.final_price
        ? prevItem.final_price + optionPrice
        : optionPrice,
    }));
    setIsModalOpen(false);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === currentItem?.product_id
          ? {
              ...item,
              quantity,
              options_name,
              final_price: item.final_price + optionPrice,
            }
          : item
      )
    );
  };

  // openModal 함수의 매개변수 item에 Item 타입을 지정합니다.
  const openModal = (item: Item) => {
    const currentItemOptions = itemOptions.find(
      (option) => option.option_id === item.product_id
    ) || { quantity: 1, option: "" };
    setCurrentItem({ ...item, ...currentItemOptions });
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="cart_wrap">
        <h1 className="shopcart_title">장바구니</h1>
        <h3>배송상품</h3>
        <div className="cart-check">
          <div className="checkbox-label-group">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              id="inp_allRe1"
              title="올리브영 배송상품 전체 선택"
            />
            <label htmlFor="inp_allRe1">전체 선택</label>
          </div>
        </div>
        <table className="cart_table">
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
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.product_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[index] || false}
                    />
                  </td>
                  <td>
                    <div className="cart_productinfo">
                      <a className="prd_img" href={``}>
                        <img src={item.product_img} alt={item.product_name} />
                      </a>
                      <a className="prd_name" href={``}>
                        <span id="brandName">{item.brand}</span>
                        <p id="goodsName">{item.product_name}</p>
                        <span id="optionName">
                          {item.options_name || currentItemOptions.option_name}
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="prd_quantity">
                    <span id="prd_quantity">{item.quantity || 1}</span>
                  </td>
                  <td>
                    <span className="org_price">
                      {item.quantity !== undefined
                        ? (item.price * item.quantity)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : ""}
                      원
                    </span>
                    <span className="pur_price">
                      {item.quantity !== undefined
                        ? (item.final_price * item.quantity)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : ""}
                      원
                    </span>
                  </td>

                  <td>
                    <p className="prd_delivery">
                      <strong id="deliStrongText">
                        무료배송
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
                        onClick={() => handleDeleteItem(item)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>장바구니가 비어 있습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="basket_price_info">
          <div className="sum_price">
            총 상품금액
            <span className="tx_num2">{totalPrice.toLocaleString()}원</span>
            <span className="tx_sign plus"> +</span> 배송비
            <span className="tx_num2">{totalDeliveryFee}원</span>
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
                <span className="tx_num3">
                  {finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </span>
            </span>
          </div>
        </div>
        <div className="cart_oreder_btn">
          <button
            type="button"
            className="selectorder_btn"
            onClick={handleAllDelete}
          >
            전체삭제
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
        <CartOptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={currentItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CartItem;
