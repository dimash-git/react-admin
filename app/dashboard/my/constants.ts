import Plus from "@/public/icons/plus.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import Calendar from "@/public/icons/calendar.svg";
import Portfel from "@/public/icons/portfel.svg";
import Gazeta from "@/public/icons/gazeta.svg";
import Cart from "@/public/icons/cart.svg";
import Bar from "@/public/icons/bar.svg";
import QMark from "@/public/icons/qmark.svg";

export const homeBaseUrl = "/dashboard/my";

export const homeSections = {
  events: {
    name: "Мероприятие",
    icon: Calendar,
    links: [
      {
        name: "Создать мероприятие",
        icon: Plus,
        to: homeBaseUrl + "/events/add",
        slug: "add_event",
      },
      {
        name: "Все мероприятия",
        icon: ArrowRight,
        to: homeBaseUrl + "/events",
        slug: "list_events",
      },
    ],
  },
  promo: {
    name: "Промо материалы",
    icon: Portfel,
    links: [
      {
        name: "Создать новость",
        icon: Plus,
        to: homeBaseUrl + "/promo/add",
      },
      {
        name: "Все новости",
        icon: ArrowRight,
        to: homeBaseUrl + "/promo",
      },
    ],
  },
  news: {
    name: "Новости",
    icon: Gazeta,
    links: [
      {
        name: "Создать новость",
        icon: Plus,
        to: homeBaseUrl + "/news/add",
      },
      {
        name: "Редактор тегов",
        icon: ArrowRight,
        to: homeBaseUrl + "/tags",
      },
      {
        name: "Все новости",
        icon: ArrowRight,
        to: homeBaseUrl + "/news/",
      },
    ],
  },
  products: {
    name: "Продукты",
    icon: Cart,
    links: [
      {
        name: "Добавить продукт",
        icon: Plus,
        to: homeBaseUrl + "/products/add",
      },
      {
        name: "Редактор категорий",
        icon: ArrowRight,
        to: homeBaseUrl + "/products/edit",
      },
      {
        name: "Все продукты",
        icon: ArrowRight,
        to: homeBaseUrl + "/products/",
      },
    ],
  },
  marketing: {
    name: "Маркетинг",
    icon: Bar,
    links: [
      {
        name: "Создать маркетинг продукт",
        icon: Plus,
        to: homeBaseUrl + "/marketing/add",
      },

      {
        name: "Все маркетинг продукты",
        icon: ArrowRight,
        to: homeBaseUrl + "/marketing/",
      },
    ],
  },
  support: {
    name: "Поддержка",
    icon: QMark,
    cats: [
      {
        name: "Категории",
        links: [
          {
            name: "Создать категорию",
            icon: Plus,
            to: homeBaseUrl + "/support/cats/add",
          },
          {
            name: "Все категории",
            icon: ArrowRight,
            to: homeBaseUrl + "/support/cats",
          },
        ],
      },

      {
        name: "Короткие вопросы",
        links: [
          {
            name: "Создать короткий ответ ",
            icon: Plus,
            to: homeBaseUrl + "/support/qa/add",
          },
          {
            name: "Все короткие ответы",
            icon: ArrowRight,
            to: homeBaseUrl + "/support/qa",
          },
        ],
      },
      {
        name: "Статьи",
        links: [
          {
            name: "Создать статью",
            icon: Plus,
            to: homeBaseUrl + "/support/articles/add",
          },
          {
            name: "Все статьти",
            icon: ArrowRight,
            to: homeBaseUrl + "/support/articles",
          },
        ],
      },
    ],
  },
};

export const homeTabs = {
  events: [
    {
      to: homeBaseUrl + "/events",
      slug: "events",
      name: "Все мероприятия",
    },
    {
      to: homeBaseUrl + "/events/add",
      slug: "add",
      name: "Создать мероприятие",
    },
  ],
  promo: [
    {
      to: homeBaseUrl + "/promo",
      slug: "promo",
      name: "Все промо материалы",
    },
    {
      to: homeBaseUrl + "/promo/add",
      slug: "add",
      name: "Добавить промо материал",
    },
  ],
  news: [
    {
      to: homeBaseUrl + "/news",
      slug: "news",
      name: "Все новости",
    },
    {
      to: homeBaseUrl + "/tags",
      slug: "tags",
      name: "Тэги",
    },
    {
      to: homeBaseUrl + "/news/add",
      slug: "add",
      name: "Добавить новость",
    },
  ],
  marketing: [
    {
      to: homeBaseUrl + "/marketing",
      slug: "marketing",
      name: "Все маркетинг продукты",
    },
    {
      to: homeBaseUrl + "/marketing/add",
      slug: "add",
      name: "Добавить маркетинг продукт",
    },
  ],
  support: [
    {
      to: homeBaseUrl + "/support/cats",
      slug: "cats",
      name: "Категории",
    },
    {
      to: homeBaseUrl + "/support/qa",
      slug: "qa",
      name: "Короткие вопросы",
    },
    {
      to: homeBaseUrl + "/support/articles",
      slug: "articles",
      name: "Статьи",
    },
  ],
};

export const homeBreadcrumbs = {
  events: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Мероприятия",
    },
  ],
  promo: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "промо материалы",
    },
  ],
  news: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Новости",
    },
  ],
  tags: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Тэги",
    },
  ],
  marketing: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Маркетинг",
    },
  ],
  support: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Поддержка",
    },
  ],
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
