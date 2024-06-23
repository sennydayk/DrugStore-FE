import React, { useState } from 'react';
import './QnAItem.css'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'

interface QnAItemProps {
    question: string;
    answer: string | null;
    questionid: number
}

interface DecodedToken {
    roles: string[];
}


const QnaItem = ({ question, answer, questionid }: QnAItemProps) => {

    const token = sessionStorage.getItem('token');
    let roles = null;

    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            roles = decodedToken.roles[0];
        } catch (error) {
            console.error('cannot decode', error);
        }
    }


    const [adminanswer, setadminAnswer] = useState(answer || "");
    const handleanswerchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setadminAnswer(e.target.value);
    }

    const encodedquestionId = encodeURIComponent(questionid);

    const submitanswerhandler = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.post(`https://drugstoreproject.shop/product/answer?question-id=${encodedquestionId}`, {
                'message': adminanswer
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("답변이 등록되었습니다.");
                // getQnadata();
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }


    return (
        <div className='qnaitem_wrapper'>
            <div className='qnaitem_questionitem'>
                <div className='qnaitem_q'>
                    Q
                </div>
                <div className='qnaitem_question'>
                    {question}
                </div>
            </div>
            <div className='qnaitem_answeritem'>
                <div className='qnaitem_a'>
                    A
                </div>
                {roles === 'ROLE_ADMIN' ?
                    (<>
                        <textarea className='answer_answerinput' onChange={handleanswerchange}
                            value={adminanswer}>
                        </textarea>
                        <button className='answer_answerbutton' onClick={submitanswerhandler}>등록</button>
                    </>) : (<div className='qnaitem_answer'>
                        {answer}
                    </div>)}
            </div>
        </div>
    );
};

export default QnaItem;