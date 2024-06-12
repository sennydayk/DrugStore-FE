import React from 'react';
import "./Product.css";
import { useNavigate } from "react-router-dom";
import Like from '../../components/Like/Like';

type Props = {
    product_id: number;
    brand_name: string;
    product_name: string;
    price: number;
    product_img: string;
    final_price: number;
    likes: boolean;
    sales: boolean;
    best: boolean;
    index: number
};

export function Product({
    product_id,
    brand_name,
    product_name,
    price,
    product_img,
    final_price,
    likes,
    sales,
    best,
    index
}: Props) {
    const navigate = useNavigate();
    const onClickProduct = (product_id: number) => {
        navigate(`/detail/${product_id}`);
    }

    return (
        <div className='mainpage_product'>
            <div className='index_wrapper'>
                <div className='mainpage_product_index'>
                    {index + 1}
                </div>
            </div>
            <div className='mainpage_mainimage'>
                <img src={product_img} className='mainpage_product_img'
                    onClick={() => onClickProduct(product_id)}></img>
                <div className='mainpage_like'>
                    <Like productid={product_id}
                        likes={likes}
                    ></Like>
                </div>
            </div>
            <div className='mainpage_productinfo'>
                <div className='masinpage_brand_name'>
                    {brand_name}
                </div>
                <div className='mainpage_product_name'>
                    {product_name}
                </div>
                <a className='mainpage_price'>
                    {price}원
                </a>
                <a className='mainpage_final_price'>
                    {final_price}원
                </a>
                <div className='mainpage_likes'>
                    {likes}
                </div>
                <div className='mainpage_best'>
                    {best}
                </div>
            </div>
        </div>
    );
};
