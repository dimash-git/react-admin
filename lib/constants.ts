import Home from "@/public/icons/home.svg";
import Wheel from "@/public/icons/wheel.svg";
import Process from "@/public/icons/process.svg";
import P2P from "@/public/icons/p2p.svg";
import MLM from "@/public/icons/mlm.svg";
import User from "@/public/icons/user.svg";
import Panel from "@/public/icons/panel.svg";

const menu = [
  {
    name: "Главная",
    icon: Home,
    to: "/dashboard/my",
  },
  {
    name: "Параметры",
    icon: Wheel,
    to: "/dashboard/parameters",
  },
  {
    name: "Процессы",
    icon: Process,
    to: "/dashboard/processes",
  },
  {
    name: "P2P Платформа",
    icon: P2P,
    to: "/dashboard/p2p",
  },
  {
    name: "МЛМ",
    icon: MLM,
    to: "/dashboard/mlm",
  },
  {
    name: "Пользователи",
    icon: User,
    to: "/dashboard/users",
  },
  {
    name: "Админ панель",
    icon: Panel,
    to: "/dashboard/admin",
  },
];

export default menu;
