import React, { useState } from "react";
import "./MyPageModal.css";
import StarRatings from "react-star-ratings";
import axios from "axios";

interface ReviewAddProps {
  reviewAdd: boolean;
  setReviewAdd: React.Dispatch<React.SetStateAction<boolean>>;
  ordersId: number;
}

const ReviewAdd: React.FC<ReviewAddProps> = ({
  reviewAdd,
  setReviewAdd,
  ordersId,
}) => {
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  if (!reviewAdd) return null;

  const closeModal = () => {
    setReviewAdd(false);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  // 리뷰 작성(POST) 로직 처리
  const submitReview = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }
      console.log("사용할 토큰:", token);

      const payload = {
        ordersId,
        reviewScore,
        reviewContent: reviewText,
      };

      console.log("Submitting review with payload:", payload);

      const response = await axios.post(
        `https://drugstoreproject.shop/mypage/review/${ordersId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      if (response.status === 200) {
        alert("리뷰가 등록되었습니다.");
        closeModal();
      } else {
        console.error("Unexpected response status:", response.status);
        alert("리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypage-modal-wrapper">
      <dialog className="mypage-modal-container" open>
        <p className="mypage-modal-title">리뷰 작성하기</p>
        <StarRatings
          rating={reviewScore}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
          changeRating={setReviewScore}
        />
        <input
          className="mypage-modal-input"
          placeholder="상품은 어떠셨나요? 상세한 후기일수록 좋아요."
          value={reviewText}
          onChange={handleReviewChange}
          maxLength={300}
        />
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
          <button onClick={submitReview} style={{ marginLeft: "100px" }}>
            리뷰 등록
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewAdd;
