import { memo, useState, useEffect } from "react";
import bgChart from "../acsset/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

const ChartSection = () => {
  const [data, setData] = useState(null);
  const [chart, rank] = useSelector((state) => state.app);
  useEffect(() => {
    const labels = chart?.items
      ?.filter((item) => item.hour % 2 === 0)
      ?.map((item) => item.hour);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((i) => i.hour % 2 === 0)
            ?.map((item) => item.counter),
        });
      }
    }
    console.log(data);
    setData({ labels, datasets });
  }, [chart]);
  return (
    <div className="px-[59px] relative mt-12">
      <img
        src={bgChart}
        alt=""
        className="w-full  object-cover rounded-md max-h-[300px]"
      />
      <div className="absolute top-0 z-10 bg-[rgba(77,34,104,0.9)] bottom-0 right-[59px] left-[59px]"></div>
      <div className="absolute z-20 top-0 bottom-0 right-[59px] left-[59px] p-5">
        <h3 className="text-2xl text-white font-bold">#zingchart</h3>
        <div className="flex gap-4">
          <div className="flex-4">rank</div>
          <div className="flex-6">{data && <Line data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
