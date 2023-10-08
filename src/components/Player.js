import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultils/icons";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSong from "./LoadingSong";
const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  CiRepeat,
  MdSkipPrevious,
  MdSkipNext,
  BsFillPlayFill,
  CiShuffle,
  BsPauseFill,
  BsMusicNoteList,
  HiOutlineSpeakerXMark,
  HiOutlineSpeakerWave,
} = icons;
var intervalId;
const Player = ({ setisShowRightSidebar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffe, setisShuffe] = useState(false);
  const [isRepeat, setisRepeat] = useState(false);
  const [volume, setvolume] = useState(100);
  const [audio, setAudio] = useState(new Audio());
  const [isLoadedSource, setisLoadedSource] = useState(true);
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setisLoadedSource(false);
      const [response, response2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.getSong(curSongId),
      ]);
      setisLoadedSource(true);
      if (response.data.err === 0) {
        setSongInfo(response.data.data);
        dispatch(actions.setCurSongData(response.data.data));
      }
      if (response2.data.err === 0) {
        setAudio(new Audio(response2.data.data["128"]));
        audio.pause();
      } else {
        audio.pause();

        dispatch(actions.play(false));
        setAudio(new Audio());
        toast.info(response2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right:0`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef) {
      audio.play();
      const thumbEl = document.getElementById("thumb-progress");
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        setCurSeconds(Math.round(audio.currentTime));
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnd = () => {
      if (isShuffe) {
        handleCiShuffe();
      } else if (isRepeat) {
        handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("ended", handleEnd);
    };
  }, [audio, isRepeat, isShuffe]);
  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);
  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  const handleClickPeogressbar = (e) => {
    const A = trackRef.current.getBoundingClientRect();
    const percent = Math.round(((e.clientX - A.left) * 10000) / A.width / 100);
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo?.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo?.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handleCiShuffe = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex - 1].encodeId));
    dispatch(actions.play(true));
  };
  return (
    <div className="bg-[#F9C6C5] px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-4 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        {/* <div className="flex flex-col">
          <span className="font-semibold text-grey-700 text-[14px]">
            {songInfo.title}
          </span>
          <span className="text-xs text-grey-500">{songInfo.artistsNames}</span>
        </div> */}
        <div className="flex gap-4 pl-3">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] gap-2 flex-auto flex flex-col justify-center  py-2  items-center">
        <div className="flex gap-8 justify-center items-center">
          <span
            onClick={() => setisShuffe((prev) => !prev)}
            className={`cursor-pointer ${
              isShuffe ? "text-[#B74581]" : "text-[#32323d]"
            }`}
            title="Bật phát ngẫu nhiên"
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="p-1 hover:text-[#A5206D] border cursor-pointer transition border-[#826F74] hover:border-[#A5206D] rounded-full"
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setisRepeat((prev) => !prev)}
            className={`cursor-pointer ${
              isRepeat ? "text-[#B74581]" : "text-[#32323d]"
            }`}
            title="Bật phát lại tất cả"
          >
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-[#32323d] font-medium mr-[10px]">
            {" "}
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            onClick={handleClickPeogressbar}
            ref={trackRef}
            className="bg-[rgba(0,0,0,0.1)] relative hover:h-[8px] h-[3px] w-4/5 rounded-l-full rounded-r-full"
          >
            <div
              ref={thumbRef}
              id="thumb-progress"
              className="bg-[#B72479] absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full"
            ></div>
          </div>
          <span className="text-xs text-[#32323d] font-medium ml-[10px]">
            {" "}
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[30%] flex-auto flex items-center justify-end gap-1">
        <span
          onClick={() => setvolume((prev) => (+prev === 0 ? 70 : 0))}
          className="p-2"
        >
          {+volume >= 50 ? (
            <HiOutlineSpeakerWave size={16} />
          ) : +volume === 0 ? (
            <HiOutlineSpeakerXMark size={16} />
          ) : (
            <HiOutlineSpeakerWave size={16} />
          )}
        </span>
        <input
          className="h-[3px] w-[70px] bg-[#b72479] hover:h-[5px]  "
          value={volume}
          onChange={(e) => setvolume(e.target.value)}
          type="range"
          step={1}
          min={0}
          max={100}
          name=""
          id=""
        />
        <span className="h-[33px] w-[1px] bg-[rgba(0,0,0,0.05)] mx-5"></span>
        <span
          onClick={() => setisShowRightSidebar((prev) => !prev)}
          className="bg-[#b72479] hover:bg-[#A5206D] cursor-pointer font-normal border flex justify-center items-center text-white rounded px-[5px] w-[28px] h-[30px]"
        >
          <BsMusicNoteList size={14} />
        </span>
      </div>
    </div>
  );
};

export default Player;
