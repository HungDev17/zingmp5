import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { Lists, AudioLoading, Loading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultils/icons";

const Album = () => {
  const location = useLocation();
  const { BsPlayCircle } = icons;
  const { pid } = useParams();
  const [playlistData, setplaylistData] = useState({});
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const resppnse = await apis.getDetailPlaylist(pid);
      dispatch(actions.loading(false));
      if (resppnse?.data.err === 0) {
        setplaylistData(resppnse.data?.data);
        dispatch(actions.setPlaylist(resppnse?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);
  return (
    <div className="flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center ">
      <div className="flex-none items-center mb-40  w-[25%] gap-2  flex flex-col">
        <div className="w-full relative overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt=""
            className={`w-full object-contain shadow-md ${
              isPlaying
                ? " rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            }`}
          />
          <div
            className={`absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 text-white hover:bg-overlay-30 ${
              isPlaying && "rounded-full"
            }`}
          >
            {isPlaying ? <AudioLoading /> : <BsPlayCircle size={50} />}
          </div>
        </div>

        <div className=" gap-1 flex flex-col items-center">
          <h3 className="text-[20px] font-bold text-[#32323D]">
            {playlistData.title}
          </h3>
          <div className="text-xs text-[#696969]">
            Cập nhật :{" "}
            {moment.unix(playlistData?.releaseDate).format("MM/DD/YYYY")}
          </div>
          <div className="text-xs text-[#696969]">
            {playlistData?.artistsNames}
          </div>
          <div className="text-xs text-[#696969]">
            {`${Math.round(playlistData?.like / 1000)}`}K người yêu thích
          </div>
        </div>
      </div>
      <div className="flex-auto mb-40 ">
        <div className="text-sm mb-[10px] text-[#32323d] font-[Inter,sans-serif] overflow-hidden">
          <span className="text-[rgba(0,0,0,0.6)]">Lời tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </div>
        <Scrollbars style={{ width: "100%", height: "80%" }}>
          <div>
            <Lists totalDuration={playlistData?.song?.totalDuration} />
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Album;
