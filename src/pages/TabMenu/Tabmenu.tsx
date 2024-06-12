import React, { useState } from 'react';
import ProductDescription from '../Productdescription/ProductDescription';
import QnA from '../QnA/QnA';
import Review from '../DetailReview/Review';
import './Tabmenu.css'

const Tabmenu = () => {

    const [currentTab, setCurrentTab] = useState(0);

    const menuArr = [
        { name: '리뷰 조회', content: <Review></Review> },
        { name: 'QnA', content: <QnA /> },
        { name: '상품설명', content: <ProductDescription /> },
    ];

    const selectMenuHandler = (index: number) => {
        setCurrentTab(index);
    }
    return (
        <>
            <div className='tabmenu_wrapper'>
                <div className='tabmenu_tab'>
                    {menuArr.map((element, index) => {
                        return (
                            <div
                                key={index}
                                className={currentTab === index ? "submenu_focused" : "submenu"}
                                onClick={() => selectMenuHandler(index)}
                            >
                                {element.name}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="tab_content">{menuArr[currentTab].content}</div>
        </>
    )
};

export default Tabmenu;