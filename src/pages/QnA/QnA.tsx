import React from 'react';
import Question from './Question';

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

const QnA = () => {

    const qnaArray: QnaType[] = [
        {
            "question": "언제 입고되나요",
            "answer": null,
            "user_name": "jieun",
            "created_at": "2024-05-27",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "brand": "어노브",
            "question_id": 1,
            "question_status": "답변대기"
        },
        {
            "question": "언제 입고되나요",
            "answer": null,
            "user_name": "jieun",
            "created_at": "2024-05-27",
            "product_name": "어노브 대용량 딥 데미지 트리트먼트",
            "brand": "어노브",
            "question_id": 1,
            "question_status": "답변대기"
        }
    ]

    return (
        <div>
            <button>상품문의</button>
            {qnaArray.map((qna) =>
                <Question qna={qna}></Question>)}
        </div>
    );
};

export default QnA;