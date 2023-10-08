import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const SongItem = ({
  sid,
  thumbnail,
  title,
  artists,
  releaseDate,
  sm,
  style,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
      }}
      className={`w-full flex g-[10px]  justify-between  rounded-md p-[10px]  items-center
      ${style || ":bg-[#ECD0D0] hover:bg-[#ECD0D0]"}`}
    >
      <div className="flex gap-4">
        <img
          src={thumbnail}
          alt="thumbnail"
          className={`${
            sm ? "w-[40px] h-[40px] " : "w-[60px] h-[60px] "
          } object-cover rounded-md mr-[10px]`}
        />
        <div className="flex flex-col">
          <span
            className={`text-sm  font-medium ${style || " text-[#32323d]"}`}
          >
            {title}
          </span>
          <span
            className={`text-xs ${
              style || "text-[#696969]"
            }  mt-[3px] font-normal`}
          >
            {artists}
          </span>
          {releaseDate && (
            <span className="text-xs text-[#696969] mt-[3px] font-normal">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SongItem);
