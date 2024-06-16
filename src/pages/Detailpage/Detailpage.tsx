import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ProductInfo } from './ProductInfo';
import { useParams, useSearchParams } from "react-router-dom";
import Review from '../DetailReview/Review';
import Tabmenu from '../TabMenu/Tabmenu';
import './DetailPage.css'

interface ParamsType {
  productid: number
};

export function Detailpage() {

  const { productid } = useParams() as any;
  console.log('productid1', productid)

  return (
    //productid 넘겨서 productid에 해당하는 값 데이터 조회 
    <div>
      <div className='detailpage_productinfo'>
        <ProductInfo productid={productid} ></ProductInfo>
      </div>
      <div className='detailpage_tabmenu'>
        <Tabmenu productid={productid}></Tabmenu>
      </div>
    </div>
  );
};
