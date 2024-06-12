import React from "react";
import "./MyPageModal.css";
import StarRatings from "react-star-ratings";

interface ShowReviewProps {
  showReview: boolean;
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowReview: React.FC<ShowReviewProps> = ({
  showReview,
  setShowReview,
}) => {
  if (!showReview) return null;

  const closeModal = () => {
    setShowReview(false);
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
        <p className="mypage-modal-title">내가 작성한 리뷰</p>
        <StarRating />
        <input className="mypage-modal-input" placeholder="reviewcontent" />
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
          <button style={{ marginLeft: "100px" }}>리뷰 수정</button>
        </div>
      </dialog>
    </div>
  );
};

export default ShowReview;
