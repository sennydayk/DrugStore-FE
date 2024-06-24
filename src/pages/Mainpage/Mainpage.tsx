<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import Header from "../../components/Header/Header";
import "./Mainpage.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import axios from "axios";
=======
import React, { useEffect, useState } from 'react';
import { Product } from './Product'
import Header from '../../components/Header/Header';
import './Mainpage.css'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import axios from 'axios'
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ReactPaginate from 'react-paginate';
import './Pagination.css';
import useLikeHandler from '../../hook/useLikehandler'


>>>>>>> develop

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
  const [Keyword, setKeyword] = useState("");
  const [Search, setSearch] = useState(false);
  const [productarray, setProductarray] = useState<ProductType[]>([]);

<<<<<<< HEAD
  useEffect(() => {
    if (Search) {
      if (Keyword) {
        getSearchdata(Keyword);
      } else {
        getMainpagedata();
      }
    } else {
      getMainpagedata();
=======
    const searchKeyword = useSelector((state: RootState) => state.search.keyword);
    const [productarray, setProductarray] = useState<ProductType[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 24;

    const updateDataCallback = () => {
        if (searchKeyword) {
            getSearchData(searchKeyword, currentPage);
        } else {
            getMainpageData(currentPage);
        }
    };


    const { addLike, deleteLike } = useLikeHandler(updateDataCallback);

    useEffect(() => {
        if (searchKeyword) {
            getSearchData(searchKeyword, currentPage);
        } else {
            getMainpageData(currentPage);
        }
    }, [searchKeyword, currentPage]);

    //mainpage api 가져오기
    const getMainpageData = async (page: number) => {
        const token = sessionStorage.getItem('token');
        console.log('token', token)
        try {
            const response = await axios(`https://drugstoreproject.shop/main?page=${page}&size=${pageSize}`, {
                method: "GET",
                // headers: token ? { Authorization: `Bearer ${token}` } : {}
                headers: {
                    "Token": token ? sessionStorage.getItem('token') : '',
                }
            });
            setProductarray(response.data.data.product_list);
            setTotalPages(response.data.data.total_pages);
            console.log(totalPages)
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
>>>>>>> develop
    }
  }, [Search, Keyword]);

<<<<<<< HEAD
  //mainpage api 가져오기
  const getMainpagedata = async () => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    try {
      const response = await axios("https://drugstoreproject.shop/main", {
        method: "GET",
        // headers: token ? { Authorization: `Bearer ${token}` } : {}
        // headers: {
        //     "Token": token ? sessionStorage.getItem('token') : '',
        // }
      });
      setProductarray(response.data.data.product_list);
      console.log(productarray);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  console.log("productarray", productarray);

  //검색 api 가져오기
  const getSearchdata = async (Keyword: string) => {
    try {
      const response = await fetch(
        `https://drugstoreproject.shop/main/find?keyword=${Keyword}`,
        { method: "GET" }
      );
      const data = await response.json();
      console.log("data", data);
      setProductarray(data.data.content);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  // getMainpagedata();
  console.log("xx", productarray);
  return (
    <div>
      <div className="mainpage_imageslider">
        <ImageSlider adphotos={adphotos}></ImageSlider>
      </div>
      <div className="mainpage_productlist">
        {productarray.map((product, index) => {
          return <Product {...product} index={index}></Product>;
        })}
      </div>
    </div>
  );
=======
    const encodedKeyword = encodeURIComponent(searchKeyword);
    //검색 api 가져오기
    const getSearchData = async (Keyword: string, page: number) => {
        const token = sessionStorage.getItem('token');
        try {
            console.log('searchKeyword', encodedKeyword)
            const response = await axios(`https://drugstoreproject.shop/main/find?keyword=${encodedKeyword}&page=${page}&size=${pageSize}`, {
                method: "GET",
                // headers: token ? { Authorization: `Bearer ${token}` } : {}
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
    };

    console.log('main currentPage', currentPage)

    return (
        <div>
            <div className='mainpage_imageslider'>
                <ImageSlider adphotos={adphotos}></ImageSlider>
            </div>
            <div className='mainpage_productlist'>
                {productarray.map((product, index) => {
                    return <Product {...product} index={index} addLike={() => addLike(product.product_id)}
                        deleteLike={() => deleteLike(product.product_id)} currentPage={currentPage}></Product>
                })}
            </div>
            <ReactPaginate
                previousLabel={'이전'}
                nextLabel={'다음'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
>>>>>>> develop
};

export default Mainpage;
