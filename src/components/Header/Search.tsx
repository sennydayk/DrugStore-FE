import React, { useEffect, useState } from "react";
import searchicon from "../../assets/png/search.png"
import './Search.css'

function Search() {
  const [keyword, setkeyword] = useState('')

  const inputsearchhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setkeyword(e.target.value)
  }

  const searchkeywordhandler = async (keyword: string) => {
    console.log(keyword)

    // 검색 api keyword
    // try {
    //   const response = await fetch(`http://52.78.248.75:8080/main/find?keyword=${keyword}`, { method: "GET" });
    //   const data = await response.json();
    //   console.log(data)
    // } catch (error) {
    //   console.error("데이터 가져오기 중 오류 발생:", error);
    // };

  }


  return (
    <>
      <div className="search_wrapper">
        <input className="search_input" type="text" value={keyword} onChange={inputsearchhandler} />
        <div>
          <img className="search_searchicon" src={searchicon}
            onClick={() => searchkeywordhandler(keyword)}>
          </img>
        </div>
      </div>
    </>
  );
}

export default Search;
