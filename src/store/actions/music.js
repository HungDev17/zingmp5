import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});
export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});
export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});
export const setPlaylist = (songs) => ({
  type: actionTypes.PLAY_LIST,
  songs,
});
export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});
export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});
export const setCurAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});
// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.getDetailPlaylist(pid);
//     if (response?.data.err === 0) {
//       dispatch({
//         type: actionTypes.PLAY_LIST,
//         songs: response.data?.data?.song?.item,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAY_LIST,
//       songs: null,
//     });
//   }
// };