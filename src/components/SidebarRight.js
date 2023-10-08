import React, { useState, useEffect } from "react";
import icons from "../ultils/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import * as apis from "../apis";
import Scrollbars from "react-custom-scrollbars-2";
const SidebarRight = () => {
  const { ImBin } = icons;
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setplaylist] = useState();
  const { curSongData, curAlbumId, isPlaying } = useSelector(
    (state) => state.music
  );
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.getDetailPlaylist(curAlbumId);
      if (response?.data?.err === 0) {
        setplaylist(response.data.data?.song?.items);
      }
    };
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);
  return (
    <div className="flex flex-col w-full h-full text-xs">
      <div className="h-[70px] w-full flex-none  py-[14px] px-2 gap-8 flex justify-between items-center">
        <div className="flex cursor-pointer flex-auto px-[3px] justify-center bg-[#ECD0D0] py-[6px] rounded-l-full rounded-r-full">
          <span
            className={`flex justify-center flex-1 rounded-l-full rounded-r-full items-center py-[5px] ${
              !isRecent && "bg-[#F2DEDE] text-[#b72479]"
            } px-[5px]`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`flex justify-center flex-1 rounded-l-full rounded-r-full items-center py-[5px] ${
              isRecent && "bg-[#F2DEDE] text-[#b72479]"
            } px-[5px]`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-1 rounded-full bg-[#ECD0D0]">
          <ImBin size={16} />
        </span>
      </div>
      <div className="w-full flex flex-auto flex-col px-2  ">
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          {curSongData && (
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              sm
              style="bg-[#B72479] text-white "
            />
          )}
          <div>
            <div className="px-2 pt-[15px] pb-[5px] ">
              <h3 className="font-bold text-sm text-[#32323d] normal-case">
                Tiếp theo
              </h3>
            </div>
          </div>
          {playlist && (
            <div className="flex flex-auto  cursor-pointer flex-col">
              {playlist?.map((item) => (
                <SongItem
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.encodeId}
                  sm
                />
              ))}
            </div>
          )}
        </Scrollbars>
      </div>
    </div>
  );
};

export default SidebarRight;
