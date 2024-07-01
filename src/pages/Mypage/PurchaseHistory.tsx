import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import testimg from "../../assets/jpeg/test.jpeg";
import ReviewAdd from "../../components/MyPageModal/ReviewAdd";
import axios from "axios";
import ReactPaginate from "react-paginate";
import result from "../../assets/png/result.png";

interface Order {
  ordersId: number;
  productImg: string;
  price: number;
  productName: string;
  optionName: string;
  brand: string;
  review_status: string;
  reviewDeadline: string;
}

interface OrderData {
  data: {
    content: Order[];
    totalElements: number;
  };
}

// mypage 구매내역 api 가져오기
const getData = async (
  page: number,
  size: number = 10,
  sort: string = "ordersId"
): Promise<OrderData | null> => {
  const baseUrl = "https://drugstoreproject.shop/mypage/order";
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

// 마이페이지 구매내역 조회 로직
const PurchaseHistory: React.FC = () => {
  const [reviewAdd, setReviewAdd] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  const handleReviewAdd = (ordersId: number) => {
    setSelectedOrderId(ordersId);
    setReviewAdd(!reviewAdd);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  useEffect(() => {
    const getPageData = async () => {
      try {
        const result = await getData(page);
        if (result) {
          console.log("결과 :", result.data.content);

          // 중복 제거 로직 추가
          const seenProducts = new Set<string>();
          const uniqueOrders = result.data.content.filter((order) => {
            if (seenProducts.has(order.productName)) {
              return false;
            } else {
              seenProducts.add(order.productName);
              return true;
            }
          });

          setOrderList(uniqueOrders);
          setTotalElements(result.data.totalElements);
        } else {
          setOrderList([]);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setOrderList([]);
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
          {orderList.length === 0 ? (
            <div className="mypage-error">
              <img src={result} className="mypage-errorimg" />
              <p className="mypage-errormsg">구매내역이 없습니다.</p>
            </div>
          ) : (
            <table className="purchase-history-table">
              <thead>
                <tr>
                  <th
                    style={{ width: "15%", borderRight: "1px solid #dddddd" }}
                  >
                    주문번호
                  </th>
                  <th
                    colSpan={2}
                    style={{ width: "55%", borderRight: "1px solid #dddddd" }}
                  >
                    상품
                  </th>
                  <th
                    style={{ width: "15%", borderRight: "1px solid #dddddd" }}
                  >
                    작성 기간
                  </th>
                  <th
                    style={{ width: "15%", borderRight: "1px solid #dddddd" }}
                  >
                    리뷰 작성
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr
                    className="purchase-history-eachitem"
                    key={order.ordersId}
                  >
                    <td
                      style={{
                        borderRight: "1px solid #dddddd",
                        fontSize: "13px",
                      }}
                    >
                      {order.ordersId}
                    </td>
                    <td>
                      <img
                        src={order.productImg}
                        alt="Product"
                        className="mypage-productimg"
                      />
                    </td>
                    <td style={{ borderRight: "1px solid #dddddd" }}>
                      <p className="mypage-brand">{order.brand}</p>
                      <p className="mypage-product">{order.productName}</p>
                      <p className="mypage-option">옵션 : {order.optionName}</p>
                    </td>
                    <td
                      style={{
                        borderRight: "1px solid #dddddd",
                        fontSize: "13px",
                      }}
                    >
                      ~ {order.reviewDeadline}
                    </td>
                    <td>
                      {order.review_status ? (
                        <button onClick={() => handleReviewAdd(order.ordersId)}>
                          작성한 리뷰
                        </button>
                      ) : (
                        <button onClick={() => handleReviewAdd(order.ordersId)}>
                          리뷰 작성
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {reviewAdd && selectedOrderId !== null && (
          <ReviewAdd
            reviewAdd={reviewAdd}
            setReviewAdd={setReviewAdd}
            ordersId={selectedOrderId}
          />
        )}
      </div>
      {orderList.length === 0 ? null : (
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
    </>
  );
};

export default PurchaseHistory;
