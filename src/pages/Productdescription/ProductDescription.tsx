import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './ProductDescription.css'

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
}

interface ProductImageType {
    img_id: number;
    img_main: boolean;
    img: string;
}

interface ParamsType {
    productid: number
};


const ProductDescription = (productid: ParamsType) => {

    const [imgArray, setImgArray] = useState<ProductImageType[]>([]);
    const encodedproductId = encodeURIComponent(productid.productid);
    useEffect
        (() => {
            getDetailpageproductdescriptiondata();
        }, []);

    const getDetailpageproductdescriptiondata = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios(`https://drugstoreproject.shop/product?product-id=${encodedproductId}`, {
                method: "GET",
                headers: {
                    "Token": token ? token : '',
                }
            });
            setImgArray(response.data.data.product_img)
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    return (
        <div>
            {imgArray.map((item) => <img
                key={item.img_id}
                src={item.img}
                className="Productdescription_img"
            />)}
        </div>
    );
};

export default ProductDescription;