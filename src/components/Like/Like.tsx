import React, { useState } from 'react';
import emptyheart from "../../assets/png/emptyheart.png";
import heart from "../../assets/png/heart.png";
import './Like.css'
import axios from 'axios'

type Liketype = {
    productid: number,
    likes: boolean,
    addLike: () => void;
    deleteLike: () => void;
}
const Like = ({ productid, likes, addLike, deleteLike }: Liketype) => {

    function handleClick() {
        if (likes) {
            deleteLike();
        } else {
            addLike();
        }
    }

    return (
        <div>
            <img className="like_heart" src={likes ? heart : emptyheart}
                onClick={() => handleClick()}>
            </img>
        </div>
    );
};

export default Like;