import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import { Product } from "../Mainpage/Product";

function MyLikes() {
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

  const [productarray, setProductarray] = useState<ProductType[]>([]);
  useEffect(() => {
    getLikesData();
  }, []);

  const getLikesData = async () => {
    try {
      const response = await fetch("http://52.78.248.75:8080/likes/myList", {
        method: "GET",
      });
      const data = await response.json();
      setProductarray(data.data.product_list);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />
        <div className="mypage-likes-list">
          {productarray.map((product, index) => {
            return <Product {...product} index={index}></Product>;
          })}
        </div>
      </div>
    </>
  );
}

export default MyLikes;
