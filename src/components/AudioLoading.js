import { Audio } from "react-loader-spinner";

import React, { memo } from "react";

const AudioLoading = () => {
  return (
    <Audio
      height="45"
      width="45"
      color="white"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};

export default memo(AudioLoading);
