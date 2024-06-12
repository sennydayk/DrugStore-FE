import React from 'react';

interface QnAItemProps {
    question: string;
    answer: string | null;
}

const QnaItem = ({ question, answer }: QnAItemProps) => {
    return (
        <>
            <div>
                <a className='qnaitem_question'>
                    Q
                </a>
                {question}
            </div>
            <div>
                <a className='qnaitem_answer'>
                    A
                </a>
                {answer}
            </div>
        </>
    );
};

export default QnaItem;