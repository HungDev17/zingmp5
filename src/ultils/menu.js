import icons from "./icons";
const { ImFileMusic, GrEmptyCircle, LuCircleSlash2, FiRadio } = icons;
export const sidebarMenu = [
  {
    part: "mymusic",
    text: "Cá nhân",
    icons: <ImFileMusic size={24} />,
  },
  {
    part: "",
    text: "Khám phá",
    end: true,
    icons: <GrEmptyCircle size={24} />,
  },
  {
    part: "zing-chart",
    text: "#zingchart",
    icons: <LuCircleSlash2 size={24} />,
  },
  {
    part: "follow",
    text: "Theo dõi",
    icons: <FiRadio size={24} />,
  },
];
