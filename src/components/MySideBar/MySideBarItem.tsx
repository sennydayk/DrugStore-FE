import React from "react";

interface Props {
  menu: { name: string; path: string };
}

function MySideBarItem({ menu }: Props) {
  return (
    <div>
      <p>{menu.name}</p>
    </div>
  );
}

export default MySideBarItem;
