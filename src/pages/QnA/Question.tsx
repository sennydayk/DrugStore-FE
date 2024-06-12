import React, { useState } from 'react';
import './Question.css'
import QnAItem from '../QnA/QnAItem'

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


const QnaItem = ({ qna }: { qna: QnaType }) => {

    const [qnaVisible, setqnaVisible] = useState(false);

    const qestionclickhandler = () => {
        setqnaVisible(!qnaVisible)
    }
    return (
        <>
            <div className='qnaitem_qna' >
                <div className='qnaitem_qnastatus'>
                    {qna.question_status}
                </div>
                <div className='qnaitem_question' onClick={qestionclickhandler}>
                    {qna.question}
                </div>
                <div>
                    {qna.user_name}
                </div>
                <div>
                    {qna.created_at}
                </div>
            </div>
            <div>
                {qnaVisible && <QnAItem question={qna.question} answer={qna.answer}></QnAItem>}
            </div>
        </>
    );
};

export default QnaItem;