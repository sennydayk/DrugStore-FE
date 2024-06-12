import { removeListener } from 'process';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewItem.css'

interface ReviewType {
    nickname: string
    review_score: number,
    review_content: string
    product_name: string
    create_at: string;
    userprofile: string;
    option_name: string
}


const ReviewItem = (review: ReviewType) => {
    const ARRAY = [0, 1, 2, 3, 4];

    return (
        <div className='reviewitem_wrapper'>
            <div className='reviewitem_profile'>
                <div>
                    <img
                        src={review.userprofile}
                        className="reviewitem_userprofile"
                    />
                </div>
                <div className='reviewitem_nickname'>
                    {review.nickname}
                </div>
            </div>
            <div className='reviewitem_review'>
                <div className='reviewitem_star'>
                    {ARRAY.map((el, index) => (
                        <FaStar
                            key={index}
                            size="20"
                            style={
                                index < review.review_score
                                    ? { color: '#fa722d' }
                                    : { color: '#dadfe3' }
                            }
                        ></FaStar>
                    ))}
                </div>
                <div className='reviewitem_date'>
                    {review.create_at}
                </div>
                <div className='reviewitem_productname'>
                    {review.option_name}
                </div>
                <div className='reviewitem_content'>
                    {review.review_content}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;