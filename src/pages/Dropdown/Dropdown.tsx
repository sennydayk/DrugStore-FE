import React, { useEffect, useState } from "react";
import { optionCSS } from "react-select/dist/declarations/src/components/Option";
import { isTemplateExpression } from "typescript";
import "./Dropdown.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface productOptionType {
  product_id: number;
  option_id: number;
  option: string;
  option_price: number;
  option_stock: number;
}

interface SelectedProductCounter {
  id: number;
  count: number;
}

export default function Dropdown({
  productOptions,
  originprice,
}: {
  productOptions: productOptionType[];
  originprice: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedProductCounter[]
  >([]);
  const [isClicked, setisClicked] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    totalPricecalc();
  }, [selectedOptions]);

  const handleAddToCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      console.log("사용할 토큰:", token);

      for (const selectedOption of selectedOptions) {
        const productOption = productOptions.find(
          (option) => option.option_id === selectedOption.id
        );

        if (productOption) {
          const config = {
            method: "post",
            url: "https://drugstoreproject.shop/cart",
            headers: {
              "Content-Type": "application/json",
              Token: token,
            },
            data: {
              productId: productOption.product_id,
              quantity: selectedOption.count,
              optionId: productOption.option_id,
            },
          };
          await axios(config);
        }
      }
      // 장바구니 추가 성공 시 추가 로직 실행
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("장바구니에 추가하는 중 오류 발생:", error.message);
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태 코드:", error.response.status);
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
      // 장바구니 추가 실패 시 에러 처리 로직 실행
    }
  };

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
    setisClicked(true);
  };
  const handleSelect = (selectOptionID: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      const optionIndex = prevSelectedOptions.findIndex(
        (option) => option.id === selectOptionID
      );

      if (optionIndex > -1) {
        // ID가 이미 존재하면 count 증가
        const updatedOptions = [...prevSelectedOptions];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          count: updatedOptions[optionIndex].count + 1,
        };
        return updatedOptions;
      } else {
        // ID가 존재하지 않으면 새로운 항목 추가
        return [...prevSelectedOptions, { id: selectOptionID, count: 1 }];
      }
    });
    setIsOpen(false);
  };

  const CountMinus = (prod_id: number) => {
    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.id === prod_id && option.count >= 2
          ? { ...option, count: option.count - 1 }
          : option
      )
    );
    selectedOptions.map((item) => {
      /*0개 이하일때 메시지 */
      if (item.count < 1) {
        console.log("0개");
      }
    });
  };

  //id로 찾아서 count+1
  const CountPlus = (prod_id: number) => {
    setSelectedOptions((prev) => {
      const updatedItems = prev.map((item) => {
        const selectedproduct = productOptions.find(
          (option) => option.option_id === item.id
        );
        console.log("selectedproduct", selectedproduct);
        console.log(
          "selectedproduct.option_stock",
          selectedproduct?.option_stock
        );
        if (
          item.id === prod_id &&
          selectedproduct /*&& selectedproduct.option_stock >= item.count*/
        ) {
          return {
            ...item,
            count: item.count + 1,
          };
        } else {
          return item;
        }
      });
      return updatedItems;
    });

    selectedOptions.map((item) => {
      /*재고 넘으면 메시지 */
      const selectedproduct = productOptions.find(
        (option) => option.option_id === item.id
      );
      if (selectedproduct) {
        if (item.count > selectedproduct.option_stock) {
          console.log("재고넘어");
        }
      }
    });
  };

  const CountDelete = (prod_id: number) => {
    setSelectedOptions((prev) => {
      const nowItems = prev.filter((option) => option.id != prod_id);
      return nowItems;
    });
  };

  const totalPricecalc = () => {
    let totalPrice = 0;
    selectedOptions.map((selectedOption) => {
      productOptions.map((product) => {
        if (product.option_id === selectedOption.id) {
          totalPrice +=
            (product.option_price + originprice) * selectedOption.count;
        }
      });
    });
    settotalPrice(totalPrice);
  };

  return (
    <>
      <div className="dropdown_wrapper">
        <div
          className={`dropdown_select ${isClicked ? "clicked" : ""}`}
          onClick={handleClick}
        >
          상품을 선택해주세요 🔽
        </div>
        <div className="dropdown_options_list">
          {isOpen &&
            productOptions.map((options) => {
              return (
                <div
                  className="dropdown_option"
                  onClick={() => handleSelect(options.option_id)}
                  key={options.option_id}
                >
                  <div className="dropdown_itemoption">
                    <div className="dropdown_itemoptionname">
                      {options.option}
                    </div>
                    <div className="dropdown_itemoptionaddprice">
                      (+
                      {options.option_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      )
                    </div>
                    <div className="dropdown_itemoptionprice">
                      {(options.option_price + originprice)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <div className="dropdown_selectoption">
          {selectedOptions.map((selectedOption) => (
            <>
              <div>
                {/* id로 찾아서 productOptions에서 상품이름,가격 등 */}
                {productOptions.map((product) => {
                  if (product.option_id === selectedOption.id) {
                    return (
                      <div className="dropdown_oneitem">
                        <div className="dropdown_optionname">
                          {product.option}
                        </div>
                        <div className="dropdown_item">
                          <div className="dropdown_counter">
                            <button
                              className="cntMinus"
                              onClick={() => CountMinus(selectedOption.id)}
                            >
                              -
                            </button>
                            <div className="dropdown_optioncount">
                              {selectedOption.count}
                            </div>
                            <button
                              className="cntPlus"
                              onClick={() => CountPlus(selectedOption.id)}
                            >
                              +
                            </button>
                          </div>
                          <div className="dropdown_optionprice">
                            {(
                              (product.option_price + originprice) *
                              selectedOption.count
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </div>
                          <button
                            className="cntdelete"
                            onClick={() => CountDelete(selectedOption.id)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ))}
        </div>
      </div>
      <div>
        <div className="dropdown_totalprice">
          {
            <div className="dropdown_totalpriceright">
              {" "}
              상품금액 합계 :{" "}
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
          }
        </div>
      </div>
      <button className="dropdown_cartbutton" onClick={handleAddToCart}>
        장바구니
      </button>
    </>
  );
}
