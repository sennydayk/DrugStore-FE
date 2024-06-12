import React, { useEffect, useState } from 'react';
import { Product } from './Product'
import Header from '../../components/Header/Header';
import './Mainpage.css'
import ImageSlider from '../../components/ImageSlider/ImageSlider'



interface ProductType {
    product_id: number;
    brand_name: string;
    product_name: string;
    price: number;
    product_img: string;
    final_price: number;
    likes: boolean;
    sales: boolean;
    best: boolean;
}

interface photosType {
    src: string;
}

const adphotos: photosType[] = [
    { src: 'https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/7210969543105371656.jpg' },
    { src: 'https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/8563569463792172793.jpg' },
    { src: 'https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/7417679956940728494.jpg' },
];

const Mainpage = () => {

    //mainpage api 가져오기
    const [productarray, setProductarray] = useState<ProductType[]>([]);
    useEffect(() => {
        getMainpagedata();
    }, []);

    const getMainpagedata = async () => {
        try {
            const response = await fetch("http://52.78.248.75:8080/main/", { method: "GET" });
            const data = await response.json();
            setProductarray(data.data.product_list);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    return (
        <div>
            <div className='mainpage_imageslider'>
                <ImageSlider adphotos={adphotos}></ImageSlider>
            </div>
            <div className='mainpage_productlist'>
                {productarray.map((product, index) => {
                    return <Product {...product} index={index}></Product>
                })}
            </div>
        </div>
    );
};

export default Mainpage;