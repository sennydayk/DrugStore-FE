import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import ShowReview from "../../components/MyPageModal/ShowReview";
import axios from "axios";
import StarRatings from "react-star-ratings";
import ReactPaginate from "react-paginate";
import result from "../../assets/png/result.png";

interface Review {
  reviewId: number;
  ordersId: number;
  productImg: string;
  productName: string;
  price: number;
  brand: string;
  reviewScore: number;
  reviewContent: string;
  optionName: string;
  createAt: string;
}

interface ReviewData {
  data: {
    content: Review[];
    totalElements: number;
  };
}

// mypage 리뷰내역 api 가져오기
const getData = async (
  page: number,
  size: number = 1,
  sort: string = "ordersId"
): Promise<ReviewData | null> => {
  const baseUrl = "https://drugstoreproject.shop/mypage/reviews";

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
    }
    console.log("사용할 토큰:", token);

    // axios를 사용하여 요청을 보냄
    const response = await axios.get(baseUrl, {
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

// 리뷰 삭제(DELETE) 로직 처리
const deleteReview = async (ordersId: number): Promise<boolean> => {
  const url = `https://drugstoreproject.shop/mypage/review/${ordersId}`;

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
    }
    console.log("사용할 토큰:", token);

    // axios를 사용하여 삭제 요청을 보냄
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    });
    console.log("리뷰 삭제 응답 데이터:", response.data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting review: ", error.message);
      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태 코드:", error.response.status);
      }
    } else {
      console.error("Unexpected error: ", error);
    }
    return false;
  }
};

// 마이페이지 리뷰내역 조회 로직
const MyReviews: React.FC = () => {
  const [showReview, setShowReview] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleShowReview = (ordersId: number) => {
    setSelectedOrderId(ordersId);
    setShowReview(!showReview);
  };

  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  const handleDeleteReview = async (ordersId: number) => {
    const confirmed = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirmed) {
      const success = await deleteReview(ordersId);
      if (success) {
        alert("리뷰가 삭제되었습니다.");
        // 현재 페이지 다시 불러오기
        getPageData();
      } else {
        alert("리뷰 삭제에 실패했습니다.");
      }
    }
  };

  const getPageData = async () => {
    try {
      const result = await getData(page);
      if (result) {
        setReviewList(result.data.content);
        setTotalElements(result.data.totalElements);
      } else {
        setReviewList([]);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      setReviewList([]);
    }
  };

  useEffect(() => {
    getPageData();
  }, [page]);

  // 수정된 리뷰를 업데이트하는 콜백함수
  const handleReviewUpdated = () => {
    getPageData();
  };
  const selectedReview = reviewList.find(
    (review) => review.ordersId === selectedOrderId
  );

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div>
          {reviewList.length === 0 ? (
            <div className="mypage-error">
              <img src={result} className="mypage-errorimg" />
              <p className="mypage-errormsg">작성한 리뷰가 없습니다.</p>
            </div>
          ) : (
            <table className="myreviews-table">
              <thead>
                <tr>
                  <th colSpan={2} style={{ borderRight: "1px solid #dddddd" }}>
                    상품
                  </th>
                  <th colSpan={2}>리뷰</th>
                </tr>
              </thead>
              <tbody>
                {reviewList.map((review) => (
                  <tr className="myreviews-eachitem" key={review.reviewId}>
                    <td style={{ width: "25%" }}>
                      <img
                        src={review.productImg}
                        alt="Product"
                        className="mypage-productimg"
                      />
                    </td>
                    <td
                      style={{ width: "25%", borderRight: "1px solid #dddddd" }}
                    >
                      <p className="mypage-brand">{review.brand}</p>
                      <p className="mypage-product">{review.productName}</p>
                      <p className="mypage-option">
                        옵션 : {review.optionName}
                      </p>
                    </td>
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <p className="mypage-date">작성일 : {review.createAt}</p>
                      <p>
                        <StarRatings
                          rating={review.reviewScore}
                          starRatedColor="gold"
                          numberOfStars={5}
                          name="rating"
                          starDimension="15px"
                          starSpacing="1px"
                        />
                      </p>
                      <p className="mypage-content">{review.reviewContent}</p>
                    </td>
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <button onClick={() => handleShowReview(review.ordersId)}>
                        리뷰 수정
                      </button>
                      <button
                        style={{ marginLeft: "30px" }}
                        onClick={() => handleDeleteReview(review.ordersId)}
                      >
                        리뷰 삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {showReview && selectedOrderId !== null && selectedReview && (
          <ShowReview
            showReview={showReview}
            setShowReview={setShowReview}
            ordersId={selectedOrderId}
            reviewContent={selectedReview.reviewContent}
            reviewScore={selectedReview.reviewScore}
            onReviewUpdated={handleReviewUpdated}
          />
        )}
        {reviewList.length === 0 ? null : (
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(totalElements / 10)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"my-pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </>
  );
};

export default MyReviews;
