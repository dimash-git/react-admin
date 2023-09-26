import FiatIcon from "@/public/icons/fiat.svg";
import Plus from "@/public/icons/plus.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import BankIcon from "@/public/icons/bank.svg";
import DollarIcon from "@/public/icons/dollar.svg";
import WorldIcon from "@/public/icons/world.svg";

export const paramBaseUrl = "/dashboard/parameters";

export const paramSections = {
  fiat: {
    name: "Фиат",
    icon: FiatIcon,
    links: [
      {
        name: "Добавить фиат",
        icon: Plus,
        to: paramBaseUrl + "/fiat/add",
        slug: "add_fiat",
      },
      {
        name: "Все фиат",
        icon: ArrowRight,
        to: paramBaseUrl + "/fiat",
        slug: "list_fiat",
      },
    ],
  },
  bank: {
    name: "Банк",
    icon: BankIcon,
    links: [
      {
        name: "Добавить банк",
        icon: Plus,
        to: paramBaseUrl + "/bank/add",
        slug: "add_bank",
      },
      {
        name: "Все банки",
        icon: ArrowRight,
        to: paramBaseUrl + "/bank",
        slug: "list_bank",
      },
    ],
  },
  tradingview: {
    name: "TradingView",
    icon: DollarIcon,
    links: [
      {
        name: "Добавить символ",
        icon: Plus,
        to: paramBaseUrl + "/symbols/add",
        slug: "add_symbols",
      },
      {
        name: "Все символы",
        icon: ArrowRight,
        to: paramBaseUrl + "/symbols",
        slug: "list_symbols",
      },
    ],
  },
  countries: {
    name: "Страны",
    icon: WorldIcon,
    links: [
      {
        name: "Добавить страну",
        icon: Plus,
        to: paramBaseUrl + "/countries/add",
        slug: "add_countries",
      },
      {
        name: "Все страны",
        icon: ArrowRight,
        to: paramBaseUrl + "/countries",
        slug: "list_countries",
      },
    ],
  },
};

export const paramBreadcrumbs = {
  countries: [
    {
      to: "/dashboard/parameters",
      name: "Параметры",
    },
    {
      name: "Страны",
    },
  ],
  fiat: [
    {
      to: "/dashboard/parameters",
      name: "Параметры",
    },
    {
      name: "Фиат",
    },
  ],
  bank: [
    {
      to: "/dashboard/parameters",
      name: "Параметры",
    },
    {
      name: "Банк",
    },
  ],
  symbols: [
    {
      to: "/dashboard/parameters",
      name: "Параметры",
    },
    {
      name: "Символы",
    },
  ],
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
