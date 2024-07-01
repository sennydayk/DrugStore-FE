import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import Header from "../../components/Header/Header";
import "./Mainpage.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import useLikeHandler from "../../hook/useLikehandler";

interface ProductType {
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

interface photosType {
  src: string;
}

type FilterType = {
  filterId: number;
  filter: string;
  sortBy: string;
};

export const filterArray: FilterType[] = [
  { filterId: 1, filter: "likes", sortBy: "좋아요순" },
  { filterId: 2, filter: "sales", sortBy: "판매량순" },
  { filterId: 3, filter: "price", sortBy: "저가순" },
  { filterId: 4, filter: "reviews", sortBy: "리뷰평점순" },
  { filterId: 5, filter: "new", sortBy: "신상품순" },
];

const adphotos: photosType[] = [
  {
    src: "https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/7210969543105371656.jpg",
  },
  {
    src: "https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/8563569463792172793.jpg",
  },
  {
    src: "https://image.oliveyoung.co.kr/uploads/images/display/90000010001/1/7417679956940728494.jpg",
  },
];

const Mainpage = () => {
  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const [productarray, setProductarray] = useState<ProductType[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pageSize = 24;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setselectedFilters] = useState(filterArray[1].sortBy);

  const updateDataCallback = () => {
    if (searchKeyword) {
      getSearchData(searchKeyword, currentPage);
    } else {
      getMainpageData(currentPage);
    }
  };

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (selectedOption: string) => {
    setselectedFilters(selectedOption);
    setIsOpen(false);
  };

  const { addLike, deleteLike } = useLikeHandler(updateDataCallback);

  useEffect(() => {
    if (searchKeyword) {
      getSearchData(searchKeyword, currentPage);
    } else {
      getMainpageData(currentPage);
    }
  }, [searchKeyword, currentPage, selectedFilter]);

  //mainpage api 가져오기
  const getMainpageData = async (page: number) => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    try {
      // const response = await axios(`https://drugstoreproject.shop/main?page=${page}&size=${pageSize}`, {
      //     method: "GET",
      //     // headers: token ? { Authorization: `Bearer ${token}` } : {}
      //     headers: {
      //         "Token": token ? sessionStorage.getItem('token') : '',
      //     }
      // });
      let url = `https://drugstoreproject.shop/main?page=${page}&size=${pageSize}`;
      const token = sessionStorage.getItem("token");
      const sortByfilter = filterArray.find(
        (item) => item.sortBy === selectedFilter
      );
      if (sortByfilter) {
        url += `&sortby=${sortByfilter.filter}`;
      }
      const response = await axios.get(url, {
        headers: {
          Token: token ? token : "",
        },
      });
      setProductarray(response.data.data.product_list);
      setTotalPages(response.data.data.total_pages);
      console.log(totalPages);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  const encodedKeyword = encodeURIComponent(searchKeyword);
  //검색 api 가져오기
  const getSearchData = async (Keyword: string, page: number) => {
    const token = sessionStorage.getItem("token");
    try {
      // const response = await axios(`https://drugstoreproject.shop/main/find?keyword=${encodedKeyword}&page=${page}&size=${pageSize}`, {
      //     method: "GET",
      //     headers: {
      //         "Token": token ? sessionStorage.getItem('token') : '',
      //     }
      // });
      let url = `https://drugstoreproject.shop/main/find?keyword=${encodedKeyword}&page=${page}&size=${pageSize}`;
      const token = sessionStorage.getItem("token");
      const sortByfilter = filterArray.find(
        (item) => item.sortBy === selectedFilter
      );
      if (sortByfilter) {
        url += `&sortby=${sortByfilter.filter}`;
      }
      const response = await axios.get(url, {
        headers: {
          Token: token ? token : "",
        },
      });
      setProductarray(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  console.log("main currentPage", currentPage);

  return (
    <div className="mainpage-wrapper">
      <div className="mainpage_imageslider">
        <ImageSlider adphotos={adphotos}></ImageSlider>
      </div>
      <div className="main_filter_wrapper">
        <div onClick={handleClick} className="main_filter_selectdropdown">
          {selectedFilter} <span className="main_filter_icon">🔽</span>
        </div>
        {isOpen &&
          filterArray.map((filters) => {
            return (
              <div
                className="main_filter_dropdown"
                onClick={() => handleSelect(filters.sortBy)}
                key={filters.filterId}
              >
                {filters.sortBy}
              </div>
            );
          })}
      </div>
      <div className="mainpage_productlist">
        {productarray.map((product, index) => {
          return (
            <Product
              {...product}
              index={index}
              addLike={() => addLike(product.product_id)}
              deleteLike={() => deleteLike(product.product_id)}
              currentPage={currentPage}
            ></Product>
          );
        })}
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
    </div>
  );
};

export default Mainpage;