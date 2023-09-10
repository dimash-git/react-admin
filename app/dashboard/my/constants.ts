import Plus from "@/public/icons/plus.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import Calendar from "@/public/icons/calendar.svg";
import Portfel from "@/public/icons/portfel.svg";
import Gazeta from "@/public/icons/gazeta.svg";
import Cart from "@/public/icons/cart.svg";
import Bar from "@/public/icons/bar.svg";
import QMark from "@/public/icons/qmark.svg";

const myBaseUrl = "/dashboard/my";

const mySections = {
  events: {
    name: "Мероприятие",
    icon: Calendar,
    links: [
      {
        name: "Создать мероприятие",
        icon: Plus,
        to: myBaseUrl + "/events/add",
        slug: "add_event",
      },
      {
        name: "Все мероприятия",
        icon: ArrowRight,
        to: myBaseUrl + "/events",
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
        to: myBaseUrl + "/news/add",
      },
      {
        name: "Все новости",
        icon: ArrowRight,
        to: myBaseUrl + "/news",
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
        to: myBaseUrl + "/news/add",
      },
      {
        name: "Редактор тегов",
        icon: ArrowRight,
        to: myBaseUrl + "/news/edit",
      },
      {
        name: "Все новости",
        icon: ArrowRight,
        to: myBaseUrl + "/news/",
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
        to: myBaseUrl + "/products/add",
      },
      {
        name: "Редактор категорий",
        icon: ArrowRight,
        to: myBaseUrl + "/products/edit",
      },
      {
        name: "Все продукты",
        icon: ArrowRight,
        to: myBaseUrl + "/products/",
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
        to: myBaseUrl + "/marketing/add",
      },

      {
        name: "Все маркетинг продукты",
        icon: ArrowRight,
        to: myBaseUrl + "/marketing/",
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
            to: myBaseUrl + "/support/add",
          },
          {
            name: "Все категории",
            icon: ArrowRight,
            to: myBaseUrl + "/support/",
          },
        ],
      },

      {
        name: "Короткие вопросы",
        links: [
          {
            name: "Создать короткий ответ ",
            icon: Plus,
            to: myBaseUrl + "/support/answers/add",
          },
          {
            name: "Все короткие ответы",
            icon: ArrowRight,
            to: myBaseUrl + "/support/answers",
          },
        ],
      },
      {
        name: "Статьи",
        links: [
          {
            name: "Создать статью",
            icon: Plus,
            to: myBaseUrl + "/support/articles/add",
          },
          {
            name: "Все статьти",
            icon: ArrowRight,
            to: myBaseUrl + "/support/articles",
          },
        ],
      },
    ],
  },
};

const myTabs = {
  events: [
    {
      to: myBaseUrl + "/events",
      slug: "events",
      name: "Все мероприятия",
    },
    {
      to: myBaseUrl + "/events/add",
      slug: "add",
      name: "Создать мероприятие",
    },
  ],
};

const myBreadcrumbs = {
  events: [
    {
      to: "/dashboard/my",
      name: "Главная",
    },
    {
      name: "Мероприятия",
    },
  ],
};

export { mySections, myTabs };
