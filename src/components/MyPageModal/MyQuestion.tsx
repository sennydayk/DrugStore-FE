import React from "react";
import "./MyPageModal.css";

interface MyQuestionProps {
  myQuestion: boolean;
  setMyQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyQuestion: React.FC<MyQuestionProps> = ({
  myQuestion,
  setMyQuestion,
}) => {
  if (!myQuestion) return null;

  const closeModal = () => {
    setMyQuestion(false);
  };

  return (
    <div className="mypage-modal-wrapper">
      <dialog className="mypage-modal-container">
        <p className="mypage-modal-title">내가 작성한 문의</p>
        <input className="mypage-modal-input" placeholder="questioncontent" />
        <input className="mypage-modal-input" placeholder="answercontent" />
        <div className="mypage-modal-footer">
          <button onClick={closeModal}>닫기</button>
        </div>
      </dialog>
    </div>
  );
};

export default MyQuestion;
