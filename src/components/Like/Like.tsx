import React, { useState } from 'react';
import emptyheart from "../../assets/png/emptyheart.png";
import heart from "../../assets/png/heart.png";
import './Like.css'
import axios from 'axios'

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

    const addlikehandler = async (productid: number) => {
        //좋아요추가api
        console.log('add', productid)
        const token = sessionStorage.getItem('token');
        console.log(token)
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.post("http://52.78.248.75:8080/likes", {
                'product_id': productid,
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (!response.status) {
                throw new Error('Error');
            } else {
                alert("좋아요 등록");
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }

    const deletelikehandler = async (productid: number) => {
        //좋아요취소api
        const token = sessionStorage.getItem('token');
        console.log(token)
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.delete("http://52.78.248.75:8080/likes/delete", {
                data: {
                    'product_id': productid,
                },
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });
            if (!response.status) {
                throw new Error('Error');
            } else {
                alert("좋아요 취소");
            }

        } catch (error) {
            console.log("오류 발생!!:", error);
        }
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