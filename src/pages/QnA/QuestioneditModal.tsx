import React, { useEffect, useState } from 'react';
import './QuestionModal.css'
import axios from 'axios'

interface QnaType {
    question: string;
    answer: string | null,
    user_name: string;
    created_at: string;
    product_name: string;
    brand: string;
    question_id: number;
    question_status: string;
}

interface QuestionModalProps {
    showeditquestion: boolean;
    seteditshowquestion: React.Dispatch<React.SetStateAction<boolean>>;
    getQnadata: () => void;
    questionid: number;
    currentquestion: string;
}

const QuestioneditModal = ({ getQnadata, showeditquestion, seteditshowquestion, questionid, currentquestion }: QuestionModalProps) => {
    const [question, setQuestion] = useState<string>(currentquestion);

    console.log('questionid editmodal', questionid)
    const closequestionmodal = () => {
        seteditshowquestion(false)
    }


    const handlequestionchange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setQuestion(event.target.value);
        console.log(question)
    };

    const updatequestionhandler = async (questionid: number) => {
        const encodedquestionId = encodeURIComponent(questionid);
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.put(`https://drugstoreproject.shop/product/question?question-id=${encodedquestionId}`, {
                'question': question
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.data.code === 400) {
                alert(response.data.message);
            }
            else if (response.status === 200) {
                console.log(response.status)
                alert("문의가 수정되었습니다.");
                getQnadata();
            }
            else {
                throw new Error('Unexpected response code');
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }

    return (
        <div className="questionmodal_wrapper">
            <div className="questionmodal_container">
                <p className="questionmodal_title">문의 수정하기</p>
                <textarea
                    className="questionmodal_input"
                    onChange={handlequestionchange}
                    value={question}
                />
                <div className="questionmodal_footer">
                    <button onClick={closequestionmodal}>닫기</button>
                    <button onClick={() => updatequestionhandler(questionid)}>문의 수정</button>
                </div>
            </div>
        </div>
    );
};

export default QuestioneditModal;