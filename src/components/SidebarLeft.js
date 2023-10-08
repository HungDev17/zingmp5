import React from "react";
import logo from "../acsset/logo-light.svg";
import { sidebarMenu } from "../ultils/menu";
import { NavLink, useNavigate } from "react-router-dom";
import part from "../ultils/part";
const notActive =
  "py-3 px-[21px] bg-[#FBE6E6] hover:text-[#B72479] h-[48px] gap-3 text-[#32323d] flex items-center text-sm font-medium";
const active =
  "px-[21px] h-[48px] bg-[#EEDADA] gap-3 border-l-4 border-[#b72479] text-[#B72479] flex items-center text-sm font-medium";

const SidebarLeft = () => {
  const navifate = useNavigate();

  return (
    <div className="flex h-full bg-[#FBE6E6] flex-col">
      <div
        onClick={() => navifate(part.HOME)}
        className="w-full h-[70px] bg-[#FBE6E6] px-[25px] flex items-center justify-start"
      >
        <img src={logo} alt="logo" className="w-[120px]  h-10 " />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.part}
            key={item.part}
            end={item.end}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
