import React from 'react';
import './Barchart.css'

//reviewScore =[1,2,3] 형태
const Barchart = ({ reviewScore }: { reviewScore: number[] }) => {

    const totalreview = reviewScore.length

    const reviewCountArray = [];
    for (let i = 0; i < 5; i++) {
        reviewCountArray[i] = totalreview === 0 ? 0 : Number(((reviewScore.reduce((cnt, element) => cnt + Number(i + 1 === element), 0) / totalreview) * 100).toFixed(0))
    }

    return (
        <div className="bar-chart">
            {reviewCountArray.reverse().map((item, index) => (
                <div key={index} className="bar-wrapper">
                    <div className="label">{item}%</div>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{ height: `${item}%` }}
                        ></div>
                    </div>
                    <div className="label">{5 - index}점</div>
                </div>
            ))}
        </div>
    );
};

export default Barchart;