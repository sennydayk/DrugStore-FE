import React from 'react';
import './Question.css'

interface QuestionModalProps {
    showquestion: boolean;
    setshowquestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionModal = ({ showquestion, setshowquestion }: QuestionModalProps) => {

    const closequestionmodal = () => {
        setshowquestion(false)
    }

    return (
        <div className="questionmodal_wrapper">
            <dialog className="questionmodal_container">
                <p className="questionmodal_title">문의 작성하기</p>
                <input
                    className="questionmodal_input"
                    placeholder="문의를 작성해주세요"
                />
                <div className="questionmodal_footer">
                    <button onClick={closequestionmodal}>닫기</button>
                    <button >문의 등록</button>
                </div>
            </dialog>
        </div>
    );
};

export default QuestionModal;