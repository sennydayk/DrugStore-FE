import React, { useState } from "react";
import "./MyPageModal.css";
import StarRatings from "react-star-ratings";
import axios from "axios";

interface ShowReviewProps {
  showReview: boolean;
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
  ordersId: number;
}

const ShowReview: React.FC<ShowReviewProps> = ({
  showReview,
  setShowReview,
  ordersId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  if (!showReview) return null;

  const closeModal = () => {
    setShowReview(false);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // 리뷰 수정(PUT) 로직 처리
  const updateReview = async () => {
    try {
      const response = await axios.put(
        `https://drugstoreproject.shop/mypage/review/${ordersId}`,
        {
          rating,
          review: reviewText,
        }
      );

      if (response.status === 200) {
        console.log("Review updated successfully:", response.data);
        alert("리뷰가 수정되었습니다.");
        closeModal();
      } else {
        alert("리뷰 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  const StarRating = () => {
    return (
      <StarRatings
        rating={rating}
        starRatedColor="orange"
        numberOfStars={5}
        name="rating"
        starDimension="24px"
        starSpacing="2px"
        changeRating={handleRatingChange}
      />
    );
  };

  return (
    <div className="mypage-modal-wrapper">
      <dialog className="mypage-modal-container">
        <p className="mypage-modal-title">내가 작성한 리뷰</p>
        <StarRating />
        <input
          className="mypage-modal-input"
          placeholder="reviewcontent"
          value={reviewText}
          onChange={handleReviewChange}
        />
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
          <button onClick={updateReview} style={{ marginLeft: "100px" }}>
            리뷰 수정
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ShowReview;
