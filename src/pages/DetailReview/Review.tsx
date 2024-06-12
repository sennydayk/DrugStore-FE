import React from 'react';
import './Review.css'
import ReviewItem from './ReviewItem';
import reviewgood from "../../assets/png/reviewgood.png";
import reviewbad from "../../assets/png/reviewbad.png";
import Barchart from '../Barchart/Barchart';

interface ReviewType {
    nickname: string
    review_score: number,
    review_content: string
    product_name: string
    create_at: string;
    userprofile: string;
    option_name: string
}

const Review = () => {

    const reviewArray: ReviewType[] = [
        {
            "nickname": "hyeona",
            "review_score": 2,
            "review_content": "트리트먼트 좋네요",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "create_at": "2024-05-22",
            "userprofile": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017922709ko.jpg?l=ko",
            "option_name": "aaaaa",
        },
        {
            "nickname": "honghyeon",
            "review_score": 4,
            "review_content": "잘 사용하고 있어요",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "create_at": "2024-05-23",
            "userprofile": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017922709ko.jpg?l=ko",
            "option_name": "aaaaa",
        },
        {
            "nickname": "sora",
            "review_score": 4,
            "review_content": "잘 사용하고 있어요",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "create_at": "2024-05-23",
            "userprofile": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017922709ko.jpg?l=ko",
            "option_name": "aaaaa",
        },
        {
            "nickname": "sora",
            "review_score": 1,
            "review_content": "잘 사용하고 있어요",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "create_at": "2024-05-23",
            "userprofile": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017922709ko.jpg?l=ko",
            "option_name": "aaaaa",
        },
        {
            "nickname": "sora",
            "review_score": 1,
            "review_content": "잘 사용하고 있어요",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "create_at": "2024-05-23",
            "userprofile": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017922709ko.jpg?l=ko",
            "option_name": "aaaaa",
        }
    ]

    const reviewCount = reviewArray.length
    const reviewAvg = (reviewArray.reduce((acc, curr) => acc + curr.review_score, 0) / reviewCount).toFixed(1)
    const reviewScore = reviewArray.map((review) => review.review_score)
    console.log(reviewScore)

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
                {reviewArray.map((review) => {
                    return <ReviewItem {...review} ></ReviewItem>
                })}
            </div>
        </>
    );
};

export default Review;