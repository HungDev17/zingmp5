import React from "react";
import { Outlet } from "react-router-dom";
const Search = () => {
  return (
    <div>
      search
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
