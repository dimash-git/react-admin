import ArrowTwoIcon from "@/public/icons/arrow-two-sided.svg";
import BadgeIcon from "@/public/icons/badge.svg";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

export const processBaseUrl = "/dashboard/processes";

export const processSections = {
  withdrawal: {
    name: "Вывод средств",
    icon: ArrowTwoIcon,
    links: [
      {
        name: "Список инвойсов на вывод средств",
        icon: ArrowRightIcon,
        to: processBaseUrl + "/withdrawal",
        slug: "list_withdrawal",
      },
    ],
  },
  passport: {
    name: "Верификация паспорта",
    icon: BadgeIcon,
    links: [
      {
        name: "Список инвойсов на верификацию",
        icon: ArrowRightIcon,
        to: processBaseUrl + "/passport",
        slug: "list_passport",
      },
    ],
  },
};

export const processBreadcrumbs = {
  withdrawal: [
    {
      to: "/dashboard/processes",
      name: "Процессы",
    },
    {
      name: "Список инвойсов на вывод средств",
    },
  ],
  passport: [
    {
      to: "/dashboard/processes",
      name: "Процессы",
    },
    {
      name: "Список инвойсов на верификацию",
    },
  ],
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
