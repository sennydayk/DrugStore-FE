import React from "react";
import "./MyPageModal.css";

interface MyQuestionProps {
  myQuestion: boolean;
  setMyQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  questionAnswerId: number;
  question: string;
  answer: string;
  createdAt: string;
  productName: string;
  brand: string;
}

const MyQuestion: React.FC<MyQuestionProps> = ({
  myQuestion,
  setMyQuestion,
  questionAnswerId,
  question,
  answer,
  createdAt,
  productName,
  brand,
}) => {
  if (!myQuestion) return null;

  const closeModal = () => {
    setMyQuestion(false);
  };

  return (
    <div className="mypage-modal-wrapper">
      <dialog className="mypage-modal-container">
        <p className="mypage-modal-title">내가 작성한 문의</p>
        <div className="mypage-modal-info">
          <div>
            <span className="mypage-modal-info-brand">{brand}</span>
            <span className="mypage-modal-info-product">{productName}</span>
          </div>
          <p className="mypage-modal-info-date">작성일 : {createdAt}</p>
        </div>
        <div className="mypage-modal-question">Q. {question}</div>
        {answer === "" ? (
          <div className="mypage-modal-answer" style={{ color: "blue" }}>
            아직 답변이 등록되지 않았습니다.
          </div>
        ) : (
          <div className="mypage-modal-answer">A. {answer}</div>
        )}
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
        </div>
      </dialog>
    </div>
  );
};

export default MyQuestion;
