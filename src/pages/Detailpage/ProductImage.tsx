import React, { useState } from 'react';
import './ProductImage.css'
import Best from '../../components/Best/Best';

type imgType = {
    img_id: number,
    img_main: boolean,
    img: string,
};

type imgListType = imgType[]; //객체 아니고 배열로 정의
;
//imglist =[{},{},{}] 형태

const ProductImage = ({ imgList, best }: { imgList: imgListType, best: boolean }) => {

    const [imageList, setimageList] = useState<imgType[]>(imgList);

    const clickimagehandler = (imgId: number) => {
        setimageList((prev) => {
            const updatedItems = prev.map(item => {
                if (item.img_id === imgId) {
                    return {
                        ...item, img_main: true
                    }
                }
                else {
                    return {
                        ...item, img_main: false
                    }
                }
            })
            return updatedItems
        })
    }

    const mainImage = imageList.find(image => image.img_main);
    const additionalImage = imageList.filter(image => !image.img_main);

    return (
        <>
            <div className='ProductImage_imglist'>
                <div className='ProductImage_main'>
                    {mainImage && (
                        <div >
                            <img
                                src={mainImage.img}
                                className="ProductImage_select main"
                                onClick={() => clickimagehandler(mainImage.img_id)}
                            />
                        </div>

                    )}
                    <div className='ProductImage_best'>
                        <Best best={best}></Best>
                    </div>
                </div>
                <div className='ProductImage_additional'>
                    {additionalImage.map((image) => (
                        <img
                            key={image.img_id}
                            src={image.img}
                            className="ProductImage_select"
                            onClick={() => clickimagehandler(image.img_id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductImage;