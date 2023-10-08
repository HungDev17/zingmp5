import React, { useState, useEffect } from "react";
import icons from "../ultils/icons";
import { getSearch } from "../apis";
const { BsSearch } = icons;
const Search = () => {
  const [keyword, setkeyword] = useState("");
  // useEffect(() => {
  //   window.addEventListener("keyup", handleSearch);
  //   return () => {
  //     window.removeEventListener("keyup", handleSearch);
  //   };
  // }, []);
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      const response = await getSearch(keyword);
      console.log(response);
    }
  };
  return (
    <div className="w-full flex items-center">
      <span className="h-10 pl-4 rounded-l-[20px] bg-[#ECD0D0] text-[#7D7979] flex items-center justify-center">
        <BsSearch size={20} />
      </span>
      <input
        value={keyword}
        onChange={(e) => setkeyword(e.target.value)}
        onKeyUp={handleSearch}
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        type="text"
        className=" placeholder:text-[#736C6C] outline-none w-full bg-[#ECD0D0] py-[5px] px-4 rounded-r-[20px] h-10"
      />
    </div>
  );
};

export default Search;

<input type="text" />;
