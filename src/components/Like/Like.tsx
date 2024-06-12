import React, { useState } from 'react';
import emptyheart from "../../assets/png/emptyheart.png";
import heart from "../../assets/png/heart.png";
import './Like.css'

type Liketype = {
    productid: number,
    likes: boolean
}
const Like = ({ productid, likes }: Liketype) => {

    function handleClick(likes: boolean, productid: number) {
        if (likes === false) {
            addlikehandler(productid);
        } else {
            deletelikehandler(productid);
        }
    }

    const addlikehandler = (productid: number) => {
        //좋아요추가api
        console.log('add', productid)
    }

    const deletelikehandler = (productid: number) => {
        //좋아요취소api
        console.log('delete', productid)
    }

    return (
        <div>
            <img className="like_heart" src={likes === false ? emptyheart : heart}
                onClick={() => handleClick(likes, productid)}>
            </img>
        </div>
    );
};

export default Like;