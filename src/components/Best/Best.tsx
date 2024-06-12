import React from 'react';
import './Best.css'
import bestimg from "../../assets/png/best.png";

type Besttype = {
    best:boolean
}

const Best = ({best}:Besttype) => {
    return (
        <div>
              <div>
           {best===true && <img className= "best_besticon" src = { bestimg} >
            </img>
}
        </div>
        </div>
    );
};

export default Best;