import React, { useEffect } from "react";
import {
  Silder,
  Section,
  NewRelease,
  ChartSection,
  Loading,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
  const {
    chill,
    yeudoi,
    remix,
    tamtrang,
    top100,
    albumhot,
    weekChart,
    favoriteArtist,
  } = useSelector((state) => state.app);
  return (
    <>
      {chill &&
      yeudoi &&
      remix &&
      tamtrang &&
      top100 &&
      albumhot &&
      weekChart &&
      favoriteArtist ? (
        <div className="overflow-y-auto ">
          <Silder />
          {/* <NewRelease /> */}
          <Section data={chill} />
          <Section data={yeudoi} />
          <Section data={remix} />
          <Section data={tamtrang} />
          <Section data={top100} />
          {/* <ChartSection /> */}
          <Section data={albumhot} />
          <Section data={favoriteArtist} />
          <div className="flex items-center px-[43px] w-full mt-12">
            {weekChart?.map((item) => (
              <Link
                className="flex-1 px-4"
                key={item.link}
                to={item?.link?.split(".")[0]}
              >
                <img
                  src={item.cover}
                  alt=""
                  className="w-full object-cover rounded-md"
                />
              </Link>
            ))}
          </div>
          <div className="w-full h-[500px]"></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
