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
    to: "/",
  },
  {
    name: "Параметры",
    icon: Wheel,
    to: "/parameters",
  },
  {
    name: "Процессы",
    icon: Process,
    to: "/processes",
  },
  {
    name: "P2P Платформа",
    icon: P2P,
    to: "/p2p",
  },
  {
    name: "МЛМ",
    icon: MLM,
    to: "/mlm",
  },
  {
    name: "Пользователи",
    icon: User,
    to: "/users",
  },
  {
    name: "Админ панель",
    icon: Panel,
    to: "/admin",
  },
];

export default menu;
