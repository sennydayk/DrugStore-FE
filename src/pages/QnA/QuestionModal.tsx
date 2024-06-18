import React, { useState } from 'react';
import './QuestionModal.css'
import axios from 'axios'

interface QuestionModalProps {
    showquestion: boolean;
    setshowquestion: React.Dispatch<React.SetStateAction<boolean>>;
    productid: number;
    getQnadata: () => void;
    questionmode: string;
    setquestionmode: React.Dispatch<React.SetStateAction<string>>;
    // questionid: number;
}


const QuestionModal = ({ productid, showquestion, setshowquestion, getQnadata, questionmode, setquestionmode }: QuestionModalProps) => {

    const encodedproductId = encodeURIComponent(productid);
    const closequestionmodal = () => {
        setshowquestion(false)
    }

    const [question, setQuestion] = useState("");
    const handlequestionchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    }

    const submitquestionhandler = async () => {
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

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("문의가 등록되었습니다.");
                setshowquestion(false)
                getQnadata();
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }

    const updatequestionhandler = async (questionid: number) => {
        const encodedquestionId = encodeURIComponent(questionid);
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.put(`http://52.78.248.75:8080/product/question/update?question-id=${encodedquestionId}`, {
                'question': question
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("문의가 수정되었습니다.");
                getQnadata();
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }

    return (
        <div className="questionmodal_wrapper">
            <div className="questionmodal_container">
                {questionmode === 'create' ? <p className="questionmodal_title">문의 작성하기</p> :
                    <p className="questionmodal_title">문의 수정하기</p>}
                {questionmode === 'create' ? <input
                    className="questionmodal_input"
                    placeholder="문의를 작성해주세요"
                    onChange={handlequestionchange}
                /> : <input
                    className="questionmodal_input"
                    onChange={handlequestionchange}
                />}
                <div className="questionmodal_footer">
                    <button onClick={closequestionmodal}>닫기</button>
                    {/* {questionmode === 'create' ? <button onClick={submitquestionhandler}>문의 등록</button> :
                        <button onClick={() => updatequestionhandler(questionid)}>문의 수정</button>} */}

                    <button onClick={submitquestionhandler}>문의 등록</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionModal;