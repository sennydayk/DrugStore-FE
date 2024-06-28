import React, { useEffect, useState } from "react";
import "./MyPageModal.css";
import StarRatings from "react-star-ratings";
import axios from "axios";

interface ShowReviewProps {
  showReview: boolean;
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
  ordersId: number;
  reviewContent: string;
  reviewScore: number;
  onReviewUpdated: () => void; // 수정된 리뷰를 업데이트하는 콜백함수
}

const ShowReview: React.FC<ShowReviewProps> = ({
  showReview,
  setShowReview,
  ordersId,
  reviewContent,
  reviewScore,
  onReviewUpdated,
}) => {
  const [rating, setRating] = useState<number>(reviewScore);
  const [content, setContent] = useState<string>(reviewContent);

  useEffect(() => {
    setContent(reviewContent);
    setRating(reviewScore);
  }, [reviewContent, reviewScore]);

  if (!showReview) return null;

  const closeModal = () => {
    setShowReview(false);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const updateReview = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
      }

      console.log(`Updating review for orderId: ${ordersId}`);
      console.log(`Rating: ${rating}, Review: ${content}`);

      const response = await axios.put(
        `https://drugstoreproject.shop/mypage/review/${ordersId}`,
        {
          reviewScore: rating,
          reviewContent: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Review updated successfully:", response.data);
        alert("리뷰가 수정되었습니다.");
        onReviewUpdated(); // 콜백함수 호출
        closeModal();
      } else {
        console.error("Failed to update review:", response);
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
      <dialog className="mypage-modal-container" open>
        <p className="mypage-modal-title">내가 작성한 리뷰</p>
        <StarRating />
        <form>
          <div>
            <textarea
              value={content}
              onChange={handleReviewChange}
              className="mypage-modal-input"
            />
          </div>
        </form>

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
