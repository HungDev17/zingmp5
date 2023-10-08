import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultils/icons";
const Box = ({
  link,
  title,
  thumbnailM,
  artistNames,
  data,
  sortDescription,
}) => {
  const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;
  const [isHover, setisHover] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef();
  const handleHover = () => {
    setisHover(true);
    imageRef.current.classList?.remove("animate-scale-down-image");
    imageRef.current.classList?.add("animate-scale-up-image");
  };
  const handleLeave = () => {
    setisHover(false);
    imageRef.current.classList?.remove("animate-scale-up-image");
    imageRef.current.classList?.add("animate-scale-down-image");
  };
  return (
    <div
      onClick={() => {
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col  gap-2 flex-auto w-1/5 text-sm"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="w-full relative overflow-hidden rounded-lg"
      >
        {isHover && (
          <div className="absolute z-40 text-white items-center justify-center gap-7 flex top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md">
            <span>
              <AiOutlineHeart size={20} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(link?.split(".")[0], { state: { playAlbum: true } });
              }}
              className="p-1 border border-white rounded-full cursor-pointer"
            >
              <BsFillPlayFill size={35} />
            </span>
            <span>
              <BsThreeDots size={20} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avatar"
          className="w-full  h-auto rounded-lg cursor-pointer"
        />
      </div>
      {data?.sectionId === "h100" ? (
        <span className="text-xstext-sm font-bold">
          {title?.length >= 30 ? `${title?.slice(0, 20)}...` : title}
        </span>
      ) : (
        <span className="text-sm font-normal text-[#696969] font-[Inter,sans-serif]">
          {sortDescription?.length >= 40
            ? `${sortDescription?.slice(0, 40)}...`
            : sortDescription}
        </span>
      )}
    </div>
  );
};

export default Box;
