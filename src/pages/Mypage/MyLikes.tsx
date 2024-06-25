import React, { useEffect, useState } from "react";
import MySideBar from "../../components/MySideBar/MySideBar";
import UserInfo from "../../components/MyPage/UserInfo";
import "./Mypage.css";
import axios from "axios";
import { Product } from "../Mainpage/Product";
import heart from "../../assets/png/emptyheart.png";
import useLikeHandler from "../../hook/useLikehandler";

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
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found in sessionStorage");
        return;
      }

      const response = await axios("https://drugstoreproject.shop/likes", {
        method: "GET",
        headers: {
          Token: token,
        },
      });

      // Log the entire response to inspect its structure
      console.log("API Response:", response);

      const products = response.data.data || [];
      if (products.length === 0) {
        console.warn("No products found in the response");
      }

      setProductarray(products);
      console.log("Products:", products);
    } catch (error) {
      console.error("Error fetching likes data:", error);
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
            {productarray.map((product, index) => (
              <Product
                key={product.product_id}
                {...product}
                index={index}
                addLike={() => addLike(product.product_id)}
                deleteLike={() => deleteLike(product.product_id)}
                currentPage={0}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyLikes;
