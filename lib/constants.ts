import Home from "@/public/icons/home.svg";
import Wheel from "@/public/icons/wheel.svg";
import Process from "@/public/icons/process.svg";
import P2P from "@/public/icons/p2p.svg";
import MLM from "@/public/icons/mlm.svg";
import User from "@/public/icons/user.svg";
import Panel from "@/public/icons/panel.svg";

export const menu = [
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
    to: "/dashboard/panel",
  },
];

export const urlSegments = [
  { slug: "my", name: "Главная" },
  { slug: "events", name: "Мероприятия" },
  { slug: "promo", name: "Промо материалы" },
  { slug: "news", name: "Новости" },
  { slug: "tags", name: "Тэги" },
  { slug: "marketing", name: "Маркетинг" },
  { slug: "support", name: "Поддержка" },
  { slug: "products", name: "Продукты" },

  { slug: "add", name: "Cоздание" },
  { slug: "edit", name: "Редактирование" },
  { slug: "view", name: "Просмотр" },

  { slug: "cats", name: "Категории" },

  { slug: "parameters", name: "Параметры" },
  { slug: "fiat", name: "Фиат" },
  { slug: "bank", name: "Банк" },
  { slug: "symbols", name: "Символы" },
  { slug: "countries", name: "Страны" },

  { slug: "processes", name: "Процессы" },
  { slug: "withdrawal", name: "Список инвойсов на вывод средств" },
  { slug: "passport", name: "Список инвойсов на верификацию" },

  { slug: "qualifications", name: "Квалификации" },
  { slug: "manual-transfers", name: "Ручные переводы" },

  { slug: "appeals", name: "Апелляции" },
  { slug: "complaints", name: "жалобы на чат" },

  { slug: "panel", name: "админ панель" },
  { slug: "clause-settings", name: "Настройки клаузы" },
  { slug: "acc", name: "Акаунты администраторов" },
];

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE = 3000000;
