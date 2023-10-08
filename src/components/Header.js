import React from "react";
import icons from "../ultils/icons";
import { Search } from "./";
const { BsArrowRight, BsArrowLeft } = icons;

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-6 items-center w-full">
        <div className="flex gap-6 text-[#BBA6A9]">
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div>dang nhap</div>
    </div>
  );
};

export default Header;
