import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from '../../components/Header/Header';
import { Product } from '../Mainpage/Product';
import './Categorypage.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../Mainpage/Pagination.css';
import useLikeHandler from '../../hook/useLikehandler';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSearchKeyword } from "../../store/searchSlice";


interface DatabyCategoryType {
    product_id: number;
    brand_name: string;
    product_name: string;
    price: number;
    product_img: string;
    final_price: number;
    likes: boolean;
    sales: boolean;
    best: boolean;
}

type FilterType = {
    filterId: number;
    filter: string;
    sortBy: string;
};

export const filterArray: FilterType[] = [
    { filterId: 1, filter: 'likes', sortBy: '좋아요순' },
    { filterId: 2, filter: 'sales', sortBy: '판매량순' },
    { filterId: 3, filter: 'price', sortBy: '저가순' },
    { filterId: 4, filter: 'reviews', sortBy: '리뷰많은순' },
    { filterId: 5, filter: 'new', sortBy: '신상품순' },
];


const Categorypage = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedFilter, setselectedFilters] = useState(filterArray[1].sortBy)

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 24;

    const dispatch = useDispatch();
    const searchKeyword = useSelector((state: RootState) => state.search.keyword);

    const updateDataCallback = () => {
        getdatabyCategory(currentPage);
    };

    const { addLike, deleteLike } = useLikeHandler(updateDataCallback);

    useEffect(() => {
        if (searchKeyword) {
            getSearchData(searchKeyword, currentPage);
        } else {
            getdatabyCategory(currentPage);
        }
    }, [searchKeyword, currentPage]);

    const handleClick = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleSelect = (selectedOption: string) => {
        setselectedFilters(selectedOption);
        setIsOpen(false)
    }


    const { categoryId } = useParams() as any;
    const encodedcategoryId = encodeURIComponent(categoryId);
    const encodedfilter = encodeURIComponent(selectedFilter);


    //category api 가져오기
    const [categoryArray, setProductarray] = useState<DatabyCategoryType[]>([]);
    useEffect
        (() => {
            dispatch(setSearchKeyword(""));
            getdatabyCategory(currentPage);
        }, [categoryId, selectedFilter]);

    const getdatabyCategory = async (page: number) => {
        try {

            let url = `https://drugstoreproject.shop/main/category/${encodedcategoryId}?page=${page}&size=${pageSize}`;
            const token = sessionStorage.getItem('token');
            const sortByfilter = filterArray.find(item => item.sortBy === selectedFilter)
            console.log('sortByfilter', sortByfilter)
            if (sortByfilter) {
                url += `&sortby=${sortByfilter.filter}`;
            }
            const response = await axios.get(url, {
                headers: {
                    "Token": token ? token : '',
                }
            });
            setProductarray(response.data.data.content);
            setTotalPages(response.data.data.total_pages);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

    const encodedKeyword = encodeURIComponent(searchKeyword);
    //검색 api 가져오기
    const getSearchData = async (Keyword: string, page: number) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios(`https://drugstoreproject.shop/main/find?keyword=${encodedKeyword}&page=${page}&size=${pageSize}`, {
                method: "GET",
                headers: {
                    "Token": token ? sessionStorage.getItem('token') : '',
                }
            });
            setProductarray(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        getdatabyCategory(selected);
    };

    console.log('currentPage', currentPage)
    return (
        <div>
            <div className="categorypage_wrapper">
                <div className="filter_wrapper">
                    <div onClick={handleClick} className='filter_selectdropdown'>{selectedFilter} 🔽</div>
                    {isOpen && filterArray.map((filters) => {
                        return (
                            <div className="filter_dropdown" onClick={() => handleSelect(filters.sortBy)} key={filters.filterId}>
                                {filters.sortBy}
                            </div>
                        )
                    })}
                </div>
                <div className='mainpage_productlist'>
                    {categoryArray.map((categoryproduct, index) => {
                        return <Product {...categoryproduct} index={index} addLike={() => addLike(categoryproduct.product_id)}
                            deleteLike={() => deleteLike(categoryproduct.product_id)} currentPage={currentPage}></Product>
                    })}
                </div>
                <ReactPaginate
                    previousLabel={'이전'}
                    nextLabel={'다음'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.max(totalPages, 1)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    forcePage={currentPage}
                />
            </div>
        </div>
    );
};

export default Categorypage;