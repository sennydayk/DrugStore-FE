import React, { useEffect, useState } from 'react';
import './Review.css'
import ReviewItem from './ReviewItem';
import reviewgood from "../../assets/png/reviewgood.png";
import reviewbad from "../../assets/png/reviewbad.png";
import Barchart from '../Barchart/Barchart';
import axios from 'axios'
import StarRating from '../DetailReview/StarRating';
import ReactPaginate from "react-paginate";
import "../../pages/Mainpage/Pagination.css";

interface ReviewType {
    nickname: string
    review_score: number,
    review_content: string
    product_name: string
    create_at: string;
    profile_img: string;
    option_name: string
}

interface ParamsType {
    productid: number
};

type ReviewFilterType = {
    filterId: number;
    filter: string;
    sortBy: string;
};

export const filterArray: ReviewFilterType[] = [
    { filterId: 1, filter: "createAt", sortBy: "최신순" },
    { filterId: 2, filter: "reviewScoreDesc", sortBy: "별점높은순" },
    { filterId: 3, filter: "reviewScoreAsc", sortBy: "별점낮은순" }
];


const Review = (productid: ParamsType) => {

    const [reviewArray, setReviewArray] = useState<ReviewType[]>([]);
    const encodedproductId = encodeURIComponent(productid.productid);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 24;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setselectedFilters] = useState(filterArray[1].sortBy);

    useEffect
        (() => {
            getReviewdata(currentPage);
        }, [currentPage, selectedFilter]);

    const handleClick = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleSelect = (selectedOption: string) => {
        setselectedFilters(selectedOption);
        setIsOpen(false);
    };

    const getReviewdata = async (page: number) => {
        // const token = sessionStorage.getItem('token');
        // try {
        //     const response = await axios(`https://drugstoreproject.shop/product/review/${encodedproductId}?page=${page}&size=${pageSize}`, { method: "GET", });
        //     setReviewArray(response.data.data.content);
        //     setTotalPages(response.data.data.totalPages);
        // } catch (error) {
        //     console.error("데이터 가져오기 중 오류 발생:", error);
        // };
        let url = `https://drugstoreproject.shop/product/review/${encodedproductId}?page=${page}&size=${pageSize}`;
        const token = sessionStorage.getItem("token");
        const sortByfilter = filterArray.find(
            (item) => item.sortBy === selectedFilter
        );
        if (sortByfilter) {
            url += `&sort=${sortByfilter.filter}`;
        }
        const response = await axios.get(url, {
            headers: {
                Token: token ? token : "",
            },
        });
        setReviewArray(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
        console.log(totalPages);
    }

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const reviewCount = reviewArray.length
    const reviewAvg = reviewCount === 0 ? '0.0' : (reviewArray.reduce((acc, curr) => acc + curr.review_score, 0) / reviewCount).toFixed(1)
    const reviewScore = reviewArray.map((review) => review.review_score)

    return (
        <>
            <div className='review_wrapper'>
                <div>
                    <img className="review_reviewimogi" src={Number(reviewAvg) >= 4 ? reviewgood : reviewbad}
                    >
                    </img>
                </div>
                <div className='review_reviesinfo'>
                    <div className='review_reviewcount'>
                        총 {reviewCount}건
                    </div>
                    <div>
                        <StarRating rating={Number(reviewAvg)} />
                    </div>
                    <div className='review_reviewavg'>
                        {reviewAvg}점
                    </div>
                </div>
                <div>
                    <Barchart reviewScore={reviewScore}></Barchart>
                </div>
            </div>
            <div className="filter_wrapper">
                <div onClick={handleClick} className="filter_selectdropdown">
                    {selectedFilter} <span className="filter_icon">🔽</span>
                </div>
                {isOpen &&
                    filterArray.map((filters) => {
                        return (
                            <div
                                className="filter_dropdown"
                                onClick={() => handleSelect(filters.sortBy)}
                                key={filters.filterId}
                            >
                                {filters.sortBy}
                            </div>
                        );
                    })}
            </div>
            <div className='review_reviwlist'>
                {reviewArray.length > 0 ? reviewArray.map((review) => {
                    return <ReviewItem {...review} ></ReviewItem>
                }) : (<div className='review_noreview'>아직 작성된 리뷰가 없습니다. 첫번째 리뷰 작성자가 되어주세요!</div>)}
            </div>
            <ReactPaginate
                previousLabel={"이전"}
                nextLabel={"다음"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />

        </>


    );
};

export default Review;