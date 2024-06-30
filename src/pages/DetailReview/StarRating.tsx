import React from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

function StarRating({ rating }: { rating: number }) {
    const totalStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className={
                            starValue <= roundedRating
                                ? 'star on'
                                : starValue - 0.5 === roundedRating
                                    ? 'star half'
                                    : 'star off'
                        }
                        size={24}
                    />
                );
            })}
        </div>
    );
}

export default StarRating;
