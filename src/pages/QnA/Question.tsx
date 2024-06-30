import React, { useState } from 'react';
import './Question.css'
import QnAItem from '../QnA/QnAItem'
import axios from 'axios'
import QuestionModal from './QuestionModal';

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


const Question = ({ qna, getQnadata, showquestion, setshowquestion, qnaArray, questionmode, setquestionmode }
    : {
        qna: QnaType,
        getQnadata: () => void,
        showquestion: boolean,
        setshowquestion: React.Dispatch<React.SetStateAction<boolean>>,
        qnaArray: QnaType[],
        questionmode: string,
        setquestionmode: React.Dispatch<React.SetStateAction<string>>
    }) => {

    const [qnaVisible, setqnaVisible] = useState(false);

    const qestionclickhandler = () => {
        setqnaVisible(!qnaVisible)
    }

    const deletequestionhandler = async (questionid: number) => {
        const encodedquestionId = encodeURIComponent(questionid);
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.delete(`http://52.78.248.75:8080/product/question?question-id=${encodedquestionId}`, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("문의가 삭제되었습니다.");
                getQnadata();
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }

    const updatequestionhandler = async (questionid: number) => {
        setshowquestion(true)
        setquestionmode('edit')
        console.log('questionid', questionid)
        // setQuestionid(questionid)
    }

    return (
        <>
            <div className='qnaitem_qna' >
                <div className='qnaitem_qnastatus'>
                    {qna.question_status}
                </div>
                <div className='qnaitem_question' onClick={qestionclickhandler}>
                    {qna.question.length > 10 ? qna.question.substring(0, 10) + '...' : qna.question}
                </div>
                <div className='qnaitem_username'>
                    {qna.user_name}
                </div>
                <div className='qnaitem_createdat'>
                    {qna.created_at}
                </div>
                <button className='qnaitem_updatebutton' onClick={() => updatequestionhandler(qna.question_id)}>수정</button>
                <button className='qnaitem_deletebutton' onClick={() => deletequestionhandler(qna.question_id)}>삭제</button>
            </div>
            <div>
                {qnaVisible && <QnAItem question={qna.question} questionid={qna.question_id} answer={qna.answer} ></QnAItem>}
            </div>
        </>
    );
};

export default Question;