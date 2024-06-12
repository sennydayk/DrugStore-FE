import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";
import Header from "../../components/Header/Header";

const OrderForm: React.FC = () => {
  const [recipient, setRecipient] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [orderInfoChecked, setOrderInfoChecked] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
  const [providingChecked, setProvidingChecked] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState([
    {
      name: "홍길동",
      phoneNumber: "010-1234-5678",
      address: "경기도 수원시",
    },
  ]);
  const [items, setItems] = useState([
    {
      id: 1,
      brand: "롬앤",
      name: "[단종컬러 재출]롬앤 쥬시 래스팅 틴트(드래곤핑크, 피치미 외)",
      img: "https://image.oliveyoung.co.kr/uploads/images/goods/220/10/0000/0012/A00000012595560ko.jpg?l=ko",
      orgPrice: 9900,
      purPrice: 8400,
      delivery: "2,500",
    },
  ]);

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleDeliveryMessageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeliveryMessage(e.target.value);
  };

  const handleAllCheckChange = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setOrderInfoChecked(newValue);
    setTermsChecked(newValue);
    setPrivacyChecked(newValue);
    setProvidingChecked(newValue);
  };

  const handleIndividualCheckChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    setter(value);
    setAllChecked(
      value &&
        orderInfoChecked &&
        termsChecked &&
        privacyChecked &&
        providingChecked
    );
  };

  return (
    <div>
      <Header />
      <div className="order_payment_wrap">
        <div className="lefe_area">
          <div className="order_payment_container">
            <h1 className="orderpay_title">주문/결제</h1>
            <h2 className="orderpay_subtitle">배송지 정보</h2>
            <table>
              <caption>주문 정보</caption>
              <tbody>
                {userInfo.map((userInfo, index) => (
                  <React.Fragment key={index}>
                    <tr className="new_order_area">
                      <th scope="row">받는분</th>
                      <td className="imp_data">{userInfo.name}</td>{" "}
                    </tr>
                    <tr className="new_order_area">
                      <th scope="row">연락처</th>
                      <td className="imp_data">{userInfo.phoneNumber}</td>{" "}
                    </tr>
                    <tr className="new_order_area">
                      <th scope="row">주소</th>
                      <td className="imp_data">{userInfo.address}</td>{" "}
                    </tr>
                  </React.Fragment>
                ))}
                <tr className="new_order_area">
                  <th scope="row">배송 메시지</th>
                  <td className="imp_data">
                    <select
                      className="delivery_select"
                      value={deliveryMessage}
                      onChange={handleDeliveryMessageChange}
                    >
                      <option value="">배송메시지를 선택해주세요.</option>
                      <option value="부재 시 경비실에 맡겨주세요.">
                        부재 시 경비실에 맡겨주세요.
                      </option>
                      <option value="부재 시 문 앞에 맡겨주세요.">
                        부재 시 문 앞에 맡겨주세요.
                      </option>
                      <option value="파손의 위험이 있는 상품이오니, 배송 시 주의해주세요">
                        파손의 위험이 있는 상품이오니, 배송 시 주의해주세요
                      </option>
                      <option value="배송 전에 연락주세요.">
                        배송 전에 연락주세요.
                      </option>
                      <option value="택배함에 넣어주세요.">
                        택배함에 넣어주세요.
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="delivery_product_container">
            <h2 className="orderpay_subtitle">배송상품</h2>
            <table>
              <caption>배송상품 주문상품 목록</caption>
              <thead>
                <tr className="orderpay_table_title">
                  <th scope="col">상품정보</th>
                  <th scope="col">상품금액</th>
                  <th scope="col">수량</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <a className="pay_prd_img" href="">
                        <img src={item.img} alt={item.name} />
                      </a>
                      <a className="prd_name" href="">
                        <span id="brandName">{item.brand}</span>
                        <p id="goodsName">{item.name}</p>
                      </a>
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
                    <td className="prd_quantity">
                      <span>1</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="coupon_container">
            <h2 className="orderpay_subtitle">쿠폰</h2>
            <div className="coupon_wrap">
              <p>쿠폰 적용</p>
              <select className="coupon_select">
                <option value={"사용안함"}>사용안함</option>
                <option value={"30%할인"}>30% 할인쿠폰</option>
              </select>
            </div>
          </div>
          <div className="payment_container">
            <h2 className="orderpay_subtitle">결제</h2>
            <button type="button">신용카드</button>
            <button type="button">Kakao Pay</button>
          </div>
          <div className="terms_agreement_container">
            <h2 className="orderpay_subtitle">약관동의</h2>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheckChange}
            />
            <label>
              주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의하십니까?
            </label>
            <h3>주문 상품정보에 대한 동의</h3>
            <input
              type="checkbox"
              checked={orderInfoChecked}
              onChange={(e) =>
                handleIndividualCheckChange(
                  setOrderInfoChecked,
                  e.target.checked
                )
              }
            />
            <label>
              주문하실 상품, 가격, 배송정보, 할인내역등을 최종 확인하였으며,
              구매에 동의합니다.(전상거래법 제8조 제2항)
            </label>
            <h3>결제대행 서비스 이용약관 동의</h3>
            <div className="agreement-row">
              <div>
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) =>
                    handleIndividualCheckChange(
                      setTermsChecked,
                      e.target.checked
                    )
                  }
                />
                <label>전자금융거래 기본약관</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) =>
                    handleIndividualCheckChange(
                      setPrivacyChecked,
                      e.target.checked
                    )
                  }
                />
                <label>개인정보 수집 및 이용 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={providingChecked}
                  onChange={(e) =>
                    handleIndividualCheckChange(
                      setProvidingChecked,
                      e.target.checked
                    )
                  }
                />
                <label>개인정보 제공 및 위탁 동의</label>
              </div>
            </div>
          </div>
        </div>
        <div className="right_area">
          <h2 className="orderpay_subtitle2">최종 결제정보</h2>
          <ul className="total_payment_box">
            <li>
              <span className="tx_tit">총 상품금액</span>
              <span className="tx_cont">
                <span className="tx_num">25,200</span>원
              </span>
            </li>
            <li>
              <span className="tx_tit">쿠폰할인금액</span>
              <span className="tx_cont">
                <span className="tx_num" id="totDscntAmt_span">
                  0
                </span>
                원
              </span>
            </li>
            <li>
              <span className="tx_tit">총 배송비</span>
              <span className="tx_cont">
                <span className="tx_num" id="dlexPayAmt_span">
                  0
                </span>
                원
              </span>
            </li>
            <li className="total">
              <span className="tx_tit">최종 결제금액</span>
              <span className="tx_cont">
                <span className="tx_num" id="totPayAmt_sum_span">
                  25,200
                </span>
                원
              </span>
            </li>
            <li>
              <button
                className="btnPayment"
                id="btnPay"
                name="btnPay"
                type="button"
              >
                결제하기
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
