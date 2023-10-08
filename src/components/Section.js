import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionItem } from ".";
const Section = ({ data }) => {
  return (
    <div className="mt-12 px-[59px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] font-bold font-[Inter,sans-serif]">
          {data?.title}
        </h3>
        <span className="text-xs font-[500] text-[#696969] uppercase">
          tat ca
        </span>
      </div>
      <div className="flex items-center justify-between gap-7">
        {data.items &&
          data?.items?.length > 0 &&
          data.items
            .filter((item, index) => index <= 4)
            ?.map((item) => (
              <SectionItem
                key={item.encodeId}
                data={data}
                title={item.title}
                link={item.link}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
