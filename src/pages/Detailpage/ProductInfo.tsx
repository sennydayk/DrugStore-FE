import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useMatches } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import "./ProductInfo.css";
import Header from "../../components/Header/Header";
import ProductImage from "./ProductImage";
import info from "../../assets/png/info.png";
import Modal from "../Modal/Modal";
import useModal from "../../hook/useModal";
import axios from "axios";
import Like from "../../components/Like/Like";
import useLikeHandler from "../../hook/useLikehandler";
import StarRating from "../DetailReview/StarRating";

interface ProductdetailType {
  product_id: number;
  product_name: string;
  sales: number;
  price: number;
  final_price: number;
  product_img: ProductImageType[];
  review_count: number;
  review_avg: number;
  is_like: boolean;
  best: boolean;
  brand_name: string;
  product_options: ProductOptionType[];
}

interface ProductImageType {
  img_id: number;
  img_main: boolean;
  img: string;
}

interface ProductOptionType {
  option_id: number;
  option: string;
  option_price: number;
  option_stock: number;
}

interface ParamsType {
  productid: number;
}

export function ProductInfo(productid: ParamsType) {
  //product/detail api가져오기
  const encodedproductId = encodeURIComponent(productid.productid);

  // const [productdetail, setProductdetail] = useState<ProductdetailType[]>([]); /* 배열로 선언 */
  const [productdetail, setProductdetail] = useState<ProductdetailType | null>(
    null
  ); /* productdetail는 객체이므로 객체로 선언 */
  const [imgArray, setImgArray] = useState<ProductImageType[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => {
    getDetailpageproductInfodata();
  }, []);

  const updateDataCallback = () => {
    getDetailpageproductInfodata();
  };

  const { addLike, deleteLike } = useLikeHandler(updateDataCallback);

  const getDetailpageproductInfodata = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios(
        `https://drugstoreproject.shop/product?product-id=${encodedproductId}`,
        {
          method: "GET",
          headers: {
            Token: token ? token : "",
          },
        }
      );
      setProductdetail(response.data.data);
      setImgArray(response.data.data.product_img);
      setIsLiked(response.data.data.is_like);
      console.log("productinfo!!!!!!", isLiked);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  const mainimage = imgArray.filter((image) => image.img_main === true);

  /*key에 따라여러개의 modal관리 */
  const [modalvisible, setmodalvisible] = useState<{ [key: string]: boolean }>({
    deliveryinfo: false,
    cardinfo: false,
  });
  /* */

  const modalShippinginfo = useModal();
  const modaltodaydelivery = useModal();
  const modalCard = useModal();
  const modalPoint = useModal();

  const modalShippinginfoContent = (
    <div>
      <h2
        style={{
          borderBottom: "1px solid black",
          paddingBottom: "10px",
          textAlign: "left",
        }}
      >
        배송비안내
      </h2>
      <p>올리브영 배송 : 2500원</p>
      <div style={{ fontWeight: "bold" }}>추가배송비</div>
      <div>
        도서산간 : 2500원
        <br />
        제주지역 : 2500원
        <br />
        제주도서산간 : 7000원
      </div>
    </div>
  );

  const modalCardContent = (
    <div>
      <h2 style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}>
        카드할인혜택
      </h2>
      <p>THE CJ카드결제 시 10% 할인 (BC 카드 제외)</p>
    </div>
  );

  const modalPointContent = (
    <div>
      <h2>등급별 CJ ONE 포인트 적립</h2>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              등급
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              적립률
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              GOLD OLIVE
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              1%
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              BLACK OLIVE
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              1%
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              GREEN OLIVE
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              1%
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              PINK OLIVE
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              0.5%
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              BABY OLIVE
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "2px",
                textAlign: "center",
              }}
            >
              0.5%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const modaltodaydeliveryContent = (
    <div>
      <h2 style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}>
        오늘드림 서비스 안내{" "}
      </h2>
      <p>
        배송 및 픽업 가능 지역
        <br />
        전국 (정확한 서비스 가능여부는 배송지 등록을 통해서 확인가능)
      </p>
    </div>
  );

  if (!productdetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="productinfo_wrapper">
        <div className="productinfo_left">
          <div className="productinfo_img">
            <div className="productinfo_imagelist">
              <ProductImage
                imgList={imgArray}
                best={productdetail.best}
              ></ProductImage>
            </div>
          </div>
          <div className="productinfo_reviewinfo">
            <a className="productinfo_reviewavg">고객리뷰</a>
            <div className="productinfo_reviewstar">
              <StarRating rating={productdetail.review_avg} />
              <div>{productdetail.review_avg}</div>
            </div>
            <a className="prsoductinfo_reviewcount">
              ({productdetail.review_count}건)
            </a>
          </div>
        </div>
        <div className="productinfo_description">
          <div className="productinfo_brand_name">
            {productdetail.brand_name}
          </div>
          <div className="productinfo_productlike">
            <div className="productinfo_product_name">
              {productdetail.product_name}
            </div>
            <div className="productinfo_likeitem">
              <Like
                productid={productdetail.product_id}
                likes={isLiked}
                addLike={() => addLike(productdetail.product_id)}
                deleteLike={() => deleteLike(productdetail.product_id)}
              ></Like>
            </div>
          </div>
          <a className="productinfo_price">
            {productdetail.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </a>
          <a className="productinfo_final_price">
            {productdetail.final_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </a>
          <div className="productinfo_todayicon">
            <a className="productinfo_todaydelivery">오늘드림</a>
            {productdetail.sales > 0 && (
              <a className="productinfo_todaysale">세일</a>
            )}
          </div>
          <div className="productinfo_deliveryinfo">
            <div className="productinfo_btntxt">
              배송정보
              <img
                className="infobutton_delivery"
                src={info}
                onClick={modalShippinginfo.openModal}
              ></img>
            </div>
            <div>
              일반배송 | 2,500원 ( 20,000 원 이상 무료배송 )<br />
              <div style={{ marginLeft: "70px" }}>
                업체 배송 | 평균 3일 이내 배송
              </div>
            </div>
            <div className="productinfo_btntxt">
              오늘드림 | 2,500원 또는 5,000원
              <img
                className="infobutton_delivery"
                src={info}
                onClick={modaltodaydelivery.openModal}
              ></img>
            </div>
            <Modal
              isOpen={modaltodaydelivery.isOpen}
              closeModal={modaltodaydelivery.closeModal}
            >
              {modaltodaydeliveryContent}
            </Modal>
          </div>
          <Modal
            isOpen={modalShippinginfo.isOpen}
            closeModal={modalShippinginfo.closeModal}
          >
            {modalShippinginfoContent}
          </Modal>
          <div className="productinfo_paymentinfo">
            결제혜택
            <div className="productinfo_btntxt">
              제휴 카드 추가 10%할인
              <img
                className="infobutton_payment"
                src={info}
                onClick={modalCard.openModal}
              ></img>
            </div>
            <Modal isOpen={modalCard.isOpen} closeModal={modalCard.closeModal}>
              {modalCardContent}
            </Modal>
            <div className="productinfo_btntxt">
              제휴 포인트 최대 1% 적립 예상
              <img
                className="infobutton_payment"
                src={info}
                onClick={modalPoint.openModal}
              ></img>
            </div>
            <Modal
              isOpen={modalPoint.isOpen}
              closeModal={modalPoint.closeModal}
            >
              {modalPointContent}
            </Modal>
          </div>
          <div>
            <Dropdown
              product_id={productdetail?.product_id || 0}
              originprice={productdetail.final_price}
              productOptions={productdetail.product_options}
            ></Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
