import React from "react";
import { List } from "../components";
import moment from "moment";
import icons from "../ultils/icons";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
const { BsDot } = icons;
const Lists = ({ totalDuration }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center h-[46px] text-[rgba(0,0,0,0.6)] uppercase p-[10px] text-sm font-medium">
        <div>
          {/* icon */}
          <span>Bài hát</span>
        </div>
        <span>Album</span>
        <span>Thời gian</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default Lists;
