import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  Wechart,
  Search,
  SearchSong,
  SearchAll,
} from "./containers/public";
import { Routes, Route } from "react-router-dom";
import part from "./ultils/part";
import { useEffect } from "react";
import * as actions from "./store/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, []);

  return (
    <div>
      <div className="">
        <Routes>
          <Route path={part.PUBLIC} element={<Public />}>
            <Route path={part.HOME} element={<Home />} />
            <Route path={part.LOGIN} element={<Login />} />
            <Route path={part.MY_MUSIC} element={<Personal />} />
            <Route path={part.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={part.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={part.WEERANK__TITLE__PID} element={<Wechart />} />
            <Route path={part.SEARCH} element={<Search />}>
              <Route path={part.ALL} element={<SearchAll />} />
              <Route path={part.SONG} element={<SearchSong />} />
            </Route>

            <Route path={part.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
