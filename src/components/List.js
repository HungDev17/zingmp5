import React, { memo } from "react";
import icons from "../ultils/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const { BsMusicNoteBeamed } = icons;
const List = ({ songData }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.playAlbum(true));
        dispatch(actions.play(true));
      }}
      className="w-full flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#ECD0D0] cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumbnailM"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span className="text-xs text-[rgba(0,0,0,0.6)]">
            {songData?.artistsNames}
          </span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center text-xs text-[rgba(0,0,0,0.6)]">
        {songData?.album?.title?.length > 30
          ? `${songData?.album?.title?.slice(0, 30)}...`
          : songData?.album?.title}
      </div>
      <div className="flex-1 flex justify-end text-xs text-[rgba(0,0,0,0.6)]">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
