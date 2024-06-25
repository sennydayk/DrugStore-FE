import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import axios from 'axios'
import { Product } from "../Mainpage/Product";
import heart from "../../assets/png/emptyheart.png";
import useLikeHandler from '../../hook/useLikehandler'

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

  const updateDataCallback = () => {
    getLikesData();
  };


  const [productarray, setProductarray] = useState<ProductType[]>([]);
  useEffect(() => {
    getLikesData();
  }, []);

  const { addLike, deleteLike } = useLikeHandler(updateDataCallback);

  const getLikesData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios("https://drugstoreproject.shop/likes", {
        method: "GET",
        headers: {
          "Token": token ? sessionStorage.getItem('token') : '',
        }
      });

      setProductarray(response.data.data.product_list);
      console.log(productarray);

      setProductarray(response.data.data);

    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  return (
    <>
      <MySideBar />
      <div className="mypage-wrapper">
        <UserInfo />

        {productarray.length === 0 ? (
          <div className="mypage-error">
            <img src={heart} className="mypage-errorimg" />
            <p className="mypage-errormsg">찜한 상품이 없습니다.</p>
          </div>
        ) : (
          <div className="mypage-likes-list">
            {productarray.map((product, index) => {
              return <Product {...product} index={index} addLike={() => addLike(product.product_id)}
                deleteLike={() => deleteLike(product.product_id)} currentPage={0}></Product>;
            })}
          </div>
        )}

        <div className="mypage-likes-list">
          {productarray.map((product, index) => {
            return <Product {...product} index={index} addLike={() => addLike(product.product_id)}
              deleteLike={() => deleteLike(product.product_id)} currentPage={0}></Product>;
          })}
        </div>

      </div>
    </>
  );
}

export default MyLikes;
