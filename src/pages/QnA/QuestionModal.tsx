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
    showquestion: boolean;
    setshowquestion: React.Dispatch<React.SetStateAction<boolean>>;
    productid: number;
    getQnadata: () => void;
    questionmode: string;
    setquestionmode: React.Dispatch<React.SetStateAction<string>>;
    questionid: number;
    currentquestion: string;
    qnaArray: QnaType[];
}


const QuestionModal = ({ productid, showquestion, setshowquestion, getQnadata, questionmode, setquestionmode, questionid, currentquestion, qnaArray }: QuestionModalProps) => {
    const encodedproductId = encodeURIComponent(productid);
    const closequestionmodal = () => {
        setshowquestion(false)
    }

    const [question, setQuestion] = useState("");

    console.log('questionmodal1', questionid)
    console.log('questionmodal2', question)

    const handlequestionchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 50) {
            alert('50자 이내로 입력하세요.');
        } else {
            setQuestion(e.target.value);
            console.log('change')
        }
    }


    const submitquestionhandler = async () => {
        console.log('문의등록')
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.post(`https://drugstoreproject.shop/product/question?product-id=${encodedproductId}`, {
                'question': question
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status == 400) {
                alert("이미 답변이 완료되었습니다. 새로운 문의 글을 작성해 주시기 바랍니다.");
            }
            else if (response.status == 200) {
                alert("문의가 등록되었습니다.");
                setshowquestion(false)
                getQnadata();
            }
            else {
                throw new Error('Error');
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }



    return (
        <div className="questionmodal_wrapper">
            <div className="questionmodal_container">
                <p className="questionmodal_title">문의 작성하기</p> :
                <textarea
                    className="questionmodal_input"
                    placeholder="문의를 작성해주세요"
                    maxLength={50}
                    onChange={handlequestionchange}
                />
                <div className="questionmodal_footer">
                    <button onClick={closequestionmodal}>닫기</button>
                    <button onClick={submitquestionhandler}>문의 등록</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;