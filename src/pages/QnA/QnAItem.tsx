import React from 'react';
import './QnAItem.css'

interface QnAItemProps {
    question: string;
    answer: string | null;
}

const QnaItem = ({ question, answer }: QnAItemProps) => {
    return (
        <>
            <div className='qnaitem_questionitem'>
                <a className='qnaitem_q'>
                    Q
                </a>
                <div className='qnaitem_question'>
                    {question}
                </div>
            </div>
            <div className='qnaitem_answeritem'>
                <a className='qnaitem_a'>
                    A
                </a>
                <div className='qnaitem_answer'>
                    {answer}
                </div>
            </div>
        </>
    );
};

export default QnaItem;