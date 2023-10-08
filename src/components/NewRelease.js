import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActive, setisActive] = useState(0);
  const [songs, setsongs] = useState([]);

  useEffect(() => {
    isActive
      ? setsongs(newRelease?.items?.others)
      : setsongs(newRelease?.items?.vPop);
  }, [isActive, newRelease]);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] font-bold font-[Inter,sans-serif]">
          {newRelease?.title}
        </h3>
        <span className="text-xs font-[500] text-[#696969] uppercase">
          tat ca
        </span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => setisActive(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-300 bg-transparent ${
            isActive === 0 && "bg-main-500 text-white"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          onClick={() => setisActive(1)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-300 bg-transparent ${
            isActive === 1 && "bg-main-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full gap-4">
        {songs?.map((item) => (
          <SongItem
            key={item.encodeId}
            thumbnail={item.thumbnail}
            title={item.title}
            artists={item.artistsNames}
            releaseDate={item.releaseDate}
            sid={item.encodeId}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
