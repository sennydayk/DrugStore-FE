import React from "react";
import "./MyPageModal.css";
import StarRatings from "react-star-ratings";

interface ReviewAddProps {
  reviewAdd: boolean;
  setReviewAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewAdd: React.FC<ReviewAddProps> = ({ reviewAdd, setReviewAdd }) => {
  if (!reviewAdd) return null;

  const closeModal = () => {
    setReviewAdd(false);
  };

  const StarRating = () => {
    return (
      <StarRatings
        rating={5}
        starRatedColor="orange"
        numberOfStars={5}
        name="rating"
        starDimension="24px"
        starSpacing="2px"
      />
    );
  };

  return (
    <div className="mypage-modal-wrapper">
      <dialog className="mypage-modal-container">
        <p className="mypage-modal-title">리뷰 작성하기</p>
        <StarRating />
        <input
          className="mypage-modal-input"
          placeholder="상품은 어떠셨나요? 상세한 후기일수록 좋아요."
        />
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
          <button style={{ marginLeft: "100px" }}>리뷰 등록</button>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewAdd;
