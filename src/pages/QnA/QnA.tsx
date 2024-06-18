import React, { useEffect } from 'react';
import { useState } from 'react';
import Question from './Question';
import QuestionModal from './QuestionModal';
import axios from 'axios'
import './QnA.css'

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

type QusetionmodalProps = {
    questionmodal: boolean
}

interface ParamsType {
    productid: number
};

const QnA = ({ productid }: ParamsType) => {

    const [qnaArray, setqnaArrayy] = useState<QnaType[]>([]);
    const [questionmode, setquestionmode] = useState('create')
    const encodedproductId = encodeURIComponent(productid);

    const [questionid, setQuestionid] = useState(0)

    useEffect
        (() => {
            getQnadata();
        }, []);

    const getQnadata = async () => {
        try {
            console.log('encodedproductId2', encodedproductId)
            const response = await axios(`http://52.78.248.75:8080/product/question/list?product-id=${encodedproductId}`, { method: "GET" });
            setqnaArrayy(response.data.data);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    const [showquestion, setshowquestion] = useState(false)
    const writequestionhandler = () => {
        setshowquestion(true);
        setquestionmode('create')
        console.log(questionmode)
    }

    return (
        <div>
            <button className="qna_button" onClick={writequestionhandler}>상품문의</button>
            {showquestion && <QuestionModal questionmode={questionmode} setquestionmode={setquestionmode} getQnadata={getQnadata} productid={productid} showquestion={showquestion} setshowquestion={setshowquestion}></QuestionModal>}
            <div className='qna_qnalist'>
                {qnaArray != undefined ? qnaArray.map((qna) => {
                    return <Question
                        questionmode={questionmode} setquestionmode={setquestionmode} qnaArray={qnaArray} getQnadata={getQnadata} qna={qna} showquestion={showquestion} setshowquestion={setshowquestion}></Question>
                }) : (<div className='qna_noqna'>아직 작성된 문의가 없습니다!</div>)}
            </div>
        </div>
    );
};

export default QnA;