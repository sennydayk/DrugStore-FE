import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import MyQuestion from "../../components/MyPageModal/MyQuestion";
import axios from "axios";
import ReactPaginate from "react-paginate";
import result from "../../assets/png/result.png";

interface Question {
  question: string;
  answer: string;
  createdAt: string;
  productName: string;
  brand: string;
  questionStatus: boolean;
  questionAnswerId: number;
}

interface QuestionData {
  data: Question[];
  totalElements: number;
}

// mypage 문의내역 api 가져오기
const getData = async (
  page: number,
  size: number = 10,
  sort: string = "questionAnswerId"
): Promise<QuestionData | null> => {
  const baseUrl = "https://drugstoreproject.shop/mypage/question";
  const url = `${baseUrl}?page=${page}&size=${size}&sort=${sort}`;

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
    }
    console.log("사용할 토큰:", token);

    // axios를 사용하여 요청을 보냄
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    });
    console.log("서버 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching data: ", error.message);
      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태 코드:", error.response.status);
      }
    } else {
      console.error("Unexpected error: ", error);
    }
    return null;
  }
};

// 마이페이지 문의내역 조회 로직
const Questions: React.FC = () => {
  const [myQuestion, setMyQuestion] = useState<boolean>(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const handleMyQuestion = (questionAnswerId: number) => {
    setSelectedQuestionId(questionAnswerId);
    setMyQuestion(!myQuestion);
  };

  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  useEffect(() => {
    const getPageData = async () => {
      try {
        const result = await getData(page);
        if (result) {
          setQuestionList(result.data);
          setTotalElements(result.totalElements);
          console.log(result.data[0]);
          console.log("문의내역", questionList);
        } else {
          setQuestionList([]);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setQuestionList([]);
      }
    };
    getPageData();
  }, [page]);

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          <div className="questions-header">
            <h2>1 : 1 문의</h2>
            <button
              onClick={() => {
                alert("1:1 문의는 상품 상세페이지에서 가능합니다.");
              }}
              className="questions-button"
            >
              1:1 문의하기
            </button>
          </div>
          {questionList && questionList.length === 0 ? (
            <div className="mypage-question-error">
              <img src={result} className="mypage-errorimg" />
              <p className="mypage-errormsg">1:1 문의내역이 없습니다.</p>
            </div>
          ) : (
            <table className="questions-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>내용</th>
                  <th>작성일자</th>
                  <th>답변상태</th>
                </tr>
              </thead>
              <tbody>
                {questionList &&
                  questionList.map((question) => {
                    return (
                      <tr
                        className="questions-eachitem"
                        key={question.questionAnswerId}
                      >
                        <td>상품문의</td>
                        <td>
                          <button
                            onClick={() =>
                              handleMyQuestion(question.questionAnswerId)
                            }
                          >
                            {question.question}
                          </button>
                        </td>
                        <td>{question.createdAt}</td>
                        <td>
                          {question.questionStatus ? "답변완료" : "답변대기"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        {myQuestion && selectedQuestionId !== null && (
          <MyQuestion
            myQuestion={myQuestion}
            setMyQuestion={setMyQuestion}
            questionAnswerId={selectedQuestionId}
            question={
              questionList.find(
                (q) => q.questionAnswerId === selectedQuestionId
              )?.question || ""
            }
            answer={
              questionList.find(
                (q) => q.questionAnswerId === selectedQuestionId
              )?.answer || ""
            }
            brand={
              questionList.find(
                (q) => q.questionAnswerId === selectedQuestionId
              )?.brand || ""
            }
            productName={
              questionList.find(
                (q) => q.questionAnswerId === selectedQuestionId
              )?.productName || ""
            }
            createdAt={
              questionList.find(
                (q) => q.questionAnswerId === selectedQuestionId
              )?.createdAt || ""
            }
          />
        )}
      </div>
      {questionList && questionList.length > 0 ? (
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(totalElements / 10)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      ) : null}
    </>
  );
};

export default Questions;
