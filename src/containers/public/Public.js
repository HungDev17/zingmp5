import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  Loading,
} from "../../components";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Public = () => {
  const [isShowRightSidebar, setisShowRightSidebar] = useState(true);
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div className="w-full min-h-screen flex flex-col  bg-[#F9DBDB]">
      <div className="w-full h-full flex flex-auto ">
        <div className="w-[240px] min-h-[90.5vh] flex-none ">
          <SidebarLeft />
        </div>

        <div className="flex-auto relative border-red-500">
          {isLoading && (
            <div className="absolute top-0 bottom-0 z-20 left-0 right-0 flex items-center justify-center bg-[#F9DBDB]">
              <Loading />
            </div>
          )}

          <div className="h-[70px]  px-[59px] flex items-center mb-5">
            <Header />
          </div>
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <Outlet />
          </Scrollbars>
        </div>

        {isShowRightSidebar && (
          <div className="w-[330px] h-[90vh] hidden 1600:flex animate-slide-left flex-none border-green-500">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="flex-none h-[90px] z-50">
        <Player setisShowRightSidebar={setisShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
