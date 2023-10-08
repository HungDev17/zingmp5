import React, { memo } from "react";
import { Oval } from "react-loader-spinner";
const Loading = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#B72479"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#B72479"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default memo(Loading);
