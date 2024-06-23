import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navigation.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSearchKeyword } from "../../store/searchSlice";


type CategoryType = {
  categoryId: number;
  category: string;
};

export const categoryArray: CategoryType[] = [
  { categoryId: 1, category: '스킨케어' },
  { categoryId: 2, category: '마스크팩' },
  { categoryId: 3, category: '클렌징' },
  { categoryId: 4, category: '선케어' },
  { categoryId: 5, category: '메이크업' },
  { categoryId: 6, category: '미용소품' },
  { categoryId: 7, category: '더모코스메틱' },
  { categoryId: 8, category: '맨즈케어' },
  { categoryId: 9, category: '헤어케어' },
  { categoryId: 10, category: '바디케어' },
  { categoryId: 11, category: '향수' },
  { categoryId: 12, category: '네일' },
];

function Navigation() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isvisible, setisvisible] = useState(false)

  const searchKeyword = useSelector((state: RootState) => state.search.keyword);

  const categoryClickhandler = (categoryId: number) => {
    console.log('navvvvvvvvvvvvv')
    dispatch(setSearchKeyword(""));
    console.log(searchKeyword)
    navigate(`/main/category/${encodeURIComponent(categoryId)}`, { state: categoryId })
  }

  const togglecategoryhandler = () => {
    setisvisible((prevState) => !prevState)
  }

  return (
    <>
      {/* <div>
      <button className = "category_button"  onClick={togglecategoryhandler}>카테고리</button>
    </div> */}
      <div>
        {categoryArray.map((categoryname, index) => (
          <li key={index}>
            <button className="navigation_button" onClick={() => categoryClickhandler(categoryname.categoryId)}>
              {categoryname.category}
            </button>
          </li>
        ))}
      </div>
    </>
  );
}

export default Navigation;
