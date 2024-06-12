import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from '../../components/Header/Header';
import { Product } from '../Mainpage/Product';
import './Categorypage.css'


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
    const [selectedFilter, setselectedFilters] = useState(filterArray[0].sortBy)

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

    console.log('selectedOptions', selectedFilter)


    //category api 가져오기
    const [categoryArray, setProductarray] = useState<DatabyCategoryType[]>([]);
    useEffect
        (() => {
            getdatabyCategory();
        }, [categoryId]);

    const getdatabyCategory = async () => {
        try {
            const response = await fetch(`http://52.78.248.75:8080/main/category/${encodedcategoryId}`, { method: "GET" });
            const data = await response.json();
            setProductarray(data.data.content);
        } catch (error) {
            console.error("데이터 가져오기 중 오류 발생:", error);
        };
    }

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
                        return <Product {...categoryproduct} index={index}></Product>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categorypage;