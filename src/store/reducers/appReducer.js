import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  chill: {},
  yeudoi: {},
  remix: {},
  tamtrang: {},
  top100: {},
  newRelease: [],
  albumhot: {},
  weekChart: [],
  favoriteArtist: {},
  chart: {},
  rank: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        yeudoi:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        tamtrang:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        albumhot:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || {},
        favoriteArtist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          {},
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          [],
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
