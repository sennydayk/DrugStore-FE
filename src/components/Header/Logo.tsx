import React from "react";
import DrugStoreLogo from "../../assets/png/store.png";

function Logo() {
  return (
    <div className="logo">
      <a href="#">
        <img src={DrugStoreLogo} alt="DrugStore Logo" />
      </a>
    </div>
  );
}

export default Logo;
