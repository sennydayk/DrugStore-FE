import React, { useState, ChangeEvent } from "react";
import "./OrderPay.css";

const TermsForm: React.FC = () => {
    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [orderInfoChecked, setOrderInfoChecked] = useState<boolean>(false);
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
    const [providingChecked, setProvidingChecked] = useState<boolean>(false);

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
        <div className="terms_agreement_container">
            <h2 className="orderpay_subtitle">약관동의</h2>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleAllCheckChange}
                />
                <label>
                    주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의하십니까?
                </label>
            </div>
            <h3>주문 상품정보에 대한 동의</h3>
            <input
                type="checkbox"
                checked={orderInfoChecked}
                onChange={(e) =>
                    handleIndividualCheckChange(setOrderInfoChecked, e.target.checked)
                }
            />
            <label>
                주문하실 상품, 가격, 배송정보, 할인내역등을 최종 확인하였으며, 구매에
                동의합니다.(전상거래법 제8조 제2항)
            </label>
            <h3>결제대행 서비스 이용약관 동의</h3>
            <div className="agreement-row">
                <div>
                    <input
                        type="checkbox"
                        checked={termsChecked}
                        onChange={(e) =>
                            handleIndividualCheckChange(setTermsChecked, e.target.checked)
                        }
                    />
                    <label>전자금융거래 기본약관</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={privacyChecked}
                        onChange={(e) =>
                            handleIndividualCheckChange(setPrivacyChecked, e.target.checked)
                        }
                    />
                    <label>개인정보 수집 및 이용 동의</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={providingChecked}
                        onChange={(e) =>
                            handleIndividualCheckChange(setProvidingChecked, e.target.checked)
                        }
                    />
                    <label>개인정보 제공 및 위탁 동의</label>
                </div>
            </div>
        </div>
    );
};

export default TermsForm;