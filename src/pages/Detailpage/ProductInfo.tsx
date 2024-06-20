import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate, useMatches } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown';
import "./ProductInfo.css"
import Header from '../../components/Header/Header';
import ProductImage from './ProductImage';
import info from "../../assets/png/info.png";
import Modal from '../Modal/Modal';
import useModal from '../../hook/useModal';
import axios from 'axios'

interface ProductdetailType {
    product_id: number,
    product_name: string,
    sales: number,
    price: number,
    final_price: number,
    product_img: ProductImageType[],
    review_count: number,
    review_avg: number,
    is_like: boolean,
    best: boolean,
    brand_name: string,
    product_options: ProductOptionType[];
}

interface ProductImageType {
    img_id: number;
    img_main: boolean;
    img: string;
}

interface ProductOptionType {
    option_id: number;
    option: string;
    option_price: number;
    option_stock: number;
}

interface ParamsType {
    productid: number
};

export function ProductInfo(productid: ParamsType) {

    //product/detail api가져오기
    const encodedproductId = encodeURIComponent(productid.productid);
    console.log('encodedproductId', encodedproductId)

    // const [productdetail, setProductdetail] = useState<ProductdetailType[]>([]); /* 배열로 선언 */
    const [productdetail, setProductdetail] = useState<ProductdetailType | null>(null); /* productdetail는 객체이므로 객체로 선언 */
    const [imgArray, setImgArray] = useState<ProductImageType[]>([]);
    useEffect
        (() => {
            console.log('useeffect')
            getDetailpageproductInfodata();
        }, []);

    const getDetailpageproductInfodata = async () => {
        try {
            console.log('encodedproductId2', encodedproductId)
            const response = await axios(`https://drugstoreproject.shop/product/detail?product-id=${encodedproductId}`, { method: "GET", });
            setProductdetail(response.data.data);
            setImgArray(response.data.data.product_img)
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    const mainimage = imgArray.filter((image) => image.img_main === true);

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

    if (!productdetail) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='productinfo_wrapper'>
                <div className='productinfo_left'>
                    <div className='productinfo_img'>
                        <div className='productinfo_imagelist'>
                            <ProductImage imgList={imgArray} best={productdetail.best}></ProductImage>

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
                        {productdetail.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                    </a>
                    <a className='productinfo_final_price'>
                        {productdetail.final_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
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
                    <Dropdown productOptions={productdetail.product_options} originprice={productdetail.final_price}></Dropdown>
                </div>
            </div>
        </>
    );
};
