import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate, useMatches } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown';
import "./ProductInfo.css"
import Header from '../../components/Header/Header';
import ProductImage from './ProductImage';
import info from "../../assets/png/info.png";
import Modal from '../Modal/Modal';
import useModal from '../../hook/useModal';

interface ProductdetailType {
    product_id: number,
    product_name: string,
    sales: number,
    price: number,
    final_price: number,
    product_img: string[],
    review_count: number,
    review_avg: number,
    is_like: boolean,
    best: boolean,
    brand_name: string,
    product_options: string[];
}

interface ParamsType {
    productid: number
};

export function ProductInfo(productid: ParamsType) {

    //product/detail api가져오기
    const encodedproductId = encodeURIComponent(productid.productid);

    console.log('productid', productid)

    // const [productdetail, setProductdetail] = useState<ProductdetailType[]>([]);
    // useEffect
    //     (() => {
    //         getDetailpageproductInfodata();
    //     }, []);

    // const getDetailpageproductInfodata = async () => {
    //     try {
    //         console.log('encodedproductId', encodedproductId)
    //         const response = await fetch(`http://52.78.248.75:8080/product/detail?product-id=${encodedproductId}`, { method: "GET" });
    //         const data = await response.json();
    //         setProductdetail(data.data);
    //     } catch (error) {
    //         console.error("데이터 가져오기 중 오류 발생:", error);
    //     };
    // }

    // console.log('productdetail', productdetail)

    const productdetail = {
        "product_id": 1,
        "product_name": "어노브 대용량 딥 데미지 트리트먼트",
        "sales": 20,
        "price": 42000,
        "final_price": 33600,
        "product_img": [
            {
                "img_id": 1,
                "img_main": true,
                "img": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0016/A00000016716808ko.jpg?l=ko"
            },
            {
                "img_id": 2,
                "img_main": false,
                "img": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0011/A00000011754124ko.jpg?l=ko"
            },
            {
                "img_id": 3,
                "img_main": false,
                "img": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0019/A00000019286606ko.jpg?l=ko"
            },
            {
                "img_id": 4,
                "img_main": false,
                "img": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0020/A00000020383502ko.jpg?l=ko"
            },
        ],
        "review_count": 33,
        "review_avg": 4.6,
        "is_like": false,
        "best": true,
        "brand_name": "어노브",
        "product_options": [
            {
                "option_id": 1,
                "option": "텐더블룸",
                "option_price": 1000,
                "option_stock": 10
            },
            {
                "option_id": 2,
                "option": "웜페탈",
                "option_price": 2000,
                "option_stock": 10
            },
            {
                "option_id": 3,
                "option": "텐더블룸+ 웜페탈",
                "option_price": 3000,
                "option_stock": 10
            }
        ]
    }

    const imgArray = productdetail.product_img;

    const mainimage = productdetail.product_img.filter((image) => image.img_main === true);

    /*key에 따라여러개의 modal관리 */
    const [modalvisible, setmodalvisible] = useState<{ [key: string]: boolean }>({
        deliveryinfo: false,
        cardinfo: false
    })
    /* */

    const [deliveryinfovisible, setdeliveryinfoVisible] = useState(false);
    const [cardinfovisible, setcardinfoVisible] = useState(false);
    const clickdeliveryinfo = () => {
        setdeliveryinfoVisible(true)
    }

    const { isOpen, openModal, closeModal } = useModal();

    const clickdeliveryclose = () => {
        setdeliveryinfoVisible(false)
    }

    const clickcardclose = () => {
        setcardinfoVisible(false)
    }

    const clickcardinfo = () => {
        setcardinfoVisible(true)

    }

    const clickpointinfo = () => {

    }

    console.log(productdetail.product_img)

    return (
        <>
            <Header />
            <div className='productinfo_wrapper'>
                <div className='productinfo_left'>
                    <div className='productinfo_img'>
                        <div className='productinfo_imagelist'>
                            <ProductImage imgList={productdetail.product_img} best={productdetail.best}></ProductImage>
                        </div>
                    </div>
                    <div className='productinfo_reviewinfo'>
                        <a className='productinfo_reviewavg'>
                            고객리뷰 {productdetail.review_avg}점
                        </a>
                        <a className='prsoductinfo_reviewcount'>
                            ({productdetail.review_count}건)
                        </a>
                    </div>
                </div>
                <div className='productinfo_description'>
                    <div className='productinfo_brand_name'>
                        {productdetail.brand_name}
                    </div>
                    <div className='productinfo_product_name'>
                        {productdetail.product_name}
                    </div>
                    <a className='productinfo_price'>
                        {productdetail.price}원
                    </a>
                    <a className='productinfo_final_price'>
                        {productdetail.final_price}원
                    </a>
                    <div className='productinfo_todayicon'>
                        <a className='productinfo_todaydelivery'>
                            오늘드림
                        </a>
                        {productdetail.sales > 0 && <a className='productinfo_todaysale'>
                            세일
                        </a>}
                    </div>
                    <div className='productinfo_deliveryinfo'>
                        배송정보
                        <img className="infobutton_delivery" src={info}
                            onClick={clickdeliveryinfo}>
                        </img>

                        <div>
                            일반배송	2,500원 ( 20,000 원 이상 무료배송 )
                            올리브영 배송
                            일부 옵션 예약상품 순차배송
                        </div>
                    </div>
                    {deliveryinfovisible && (
                        <Modal isOpen={isOpen} openModal={openModal} closeModal={closeModal}
                        >
                        </Modal>
                    )}
                    <div className='productinfo_paymentinfo'>
                        결제혜택
                        <div className=''>
                            THE CJ 카드 추가 10%할인
                            <img className="infobutton_payment" src={info}
                                onClick={clickcardinfo}>
                            </img>
                        </div>
                        {cardinfovisible && (
                            <Modal isOpen={isOpen} openModal={openModal} closeModal={closeModal}
                            >
                            </Modal>
                        )}
                        <div className=''>
                            CJ ONE 포인트 최대 1% 적립 예상
                            <img className="infobutton_payment" src={info}
                                onClick={clickpointinfo}>
                            </img>
                        </div>
                    </div>
                    <Dropdown productOptions={productdetail.product_options} originprice={productdetail.price}></Dropdown>
                </div>

            </div>
        </>
    );
};
