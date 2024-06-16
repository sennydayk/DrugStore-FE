import React, { useEffect, useState } from 'react';
import './Review.css'
import ReviewItem from './ReviewItem';
import reviewgood from "../../assets/png/reviewgood.png";
import reviewbad from "../../assets/png/reviewbad.png";
import Barchart from '../Barchart/Barchart';
import axios from 'axios'

interface ReviewType {
    nickname: string
    review_score: number,
    review_content: string
    product_name: string
    create_at: string;
    userprofile: string;
    option_name: string
}

interface ParamsType {
    productid: number
};

const Review = (productid: ParamsType) => {

    const [reviewArray, setReviewArray] = useState<ReviewType[]>([]);
    const encodedproductId = encodeURIComponent(productid.productid);

    useEffect
        (() => {
            getReviewdata();
        }, []);

    const getReviewdata = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios(`http://52.78.248.75:8080/product/review/${encodedproductId}`, { method: "GET", });
            setReviewArray(response.data.data.content);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    const reviewCount = reviewArray.length
    const reviewAvg = reviewCount === 0 ? '0.0' : (reviewArray.reduce((acc, curr) => acc + curr.review_score, 0) / reviewCount).toFixed(1)
    const reviewScore = reviewArray.map((review) => review.review_score)

    return (
        <>
            <div className='review_wrapper'>
                <div>
                    <img className="review_reviewimogi" src={Number(reviewAvg) >= 4 ? reviewgood : reviewbad}
                    >
                    </img>
                </div>
                <div className='review_reviesinfo'>
                    <div className='review_reviewcount'>
                        총 {reviewCount}건
                    </div>
                    <div className='review_reviewavg'>
                        {reviewAvg}점
                    </div>
                </div>
                <div>
                    <Barchart reviewScore={reviewScore}></Barchart>
                </div>
            </div>
            <div className='review_reviwlist'>
                {reviewArray.length > 0 ? reviewArray.map((review) => {
                    return <ReviewItem {...review} ></ReviewItem>
                }) : (<div className='review_noreview'>아직 작성된 리뷰가 없습니다. 첫번째 리뷰 작성자가 되어주세요!</div>)}
            </div>
        </>
    );
};

export default Review;