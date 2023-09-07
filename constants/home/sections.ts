import Plus from "@/public/icons/plus.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import Calendar from "@/public/icons/calendar.svg";
import Portfel from "@/public/icons/portfel.svg";
import Gazeta from "@/public/icons/gazeta.svg";
import Cart from "@/public/icons/cart.svg";
import Bar from "@/public/icons/bar.svg";
import QMark from "@/public/icons/qmark.svg";

const events = {
  name: "Мероприятие",
  icon: Calendar,
  links: [
    {
      name: "Создать мероприятие",
      icon: Plus,
      to: "/my/events/add",
    },
    {
      name: "Все мероприятия",
      icon: ArrowRight,
      to: "/my/events",
    },
  ],
};

const promo = {
  name: "Промо материалы",
  icon: Portfel,
  links: [
    {
      name: "Создать новость",
      icon: Plus,
      to: "/my/news/add",
    },
    {
      name: "Все новости",
      icon: ArrowRight,
      to: "/my/news",
    },
  ],
};

const news = {
  name: "Новости",
  icon: Gazeta,
  links: [
    {
      name: "Создать новость",
      icon: Plus,
      to: "/my/news/add",
    },
    {
      name: "Редактор тегов",
      icon: ArrowRight,
      to: "/my/news/edit",
    },
    {
      name: "Все новости",
      icon: ArrowRight,
      to: "/my/news/",
    },
  ],
};

const products = {
  name: "Продукты",
  icon: Cart,
  links: [
    {
      name: "Добавить продукт",
      icon: Plus,
      to: "/my/products/add",
    },
    {
      name: "Редактор категорий",
      icon: ArrowRight,
      to: "/my/products/edit",
    },
    {
      name: "Все продукты",
      icon: ArrowRight,
      to: "/my/products/",
    },
  ],
};

const marketing = {
  name: "Маркетинг",
  icon: Bar,
  links: [
    {
      name: "Создать маркетинг продукт",
      icon: Plus,
      to: "/my/marketing/add",
    },

    {
      name: "Все маркетинг продукты",
      icon: ArrowRight,
      to: "/my/marketing/",
    },
  ],
};

const support = {
  name: "Поддержка",
  icon: QMark,
  cats: [
    {
      name: "Категории",
      links: [
        {
          name: "Создать категорию",
          icon: Plus,
          to: "/my/support/add",
        },
        {
          name: "Все категории",
          icon: ArrowRight,
          to: "/my/support/",
        },
      ],
    },

    {
      name: "Короткие вопросы",
      links: [
        {
          name: "Создать короткий ответ ",
          icon: Plus,
          to: "/my/support/answers/add",
        },
        {
          name: "Все короткие ответы",
          icon: ArrowRight,
          to: "/my/support/answers",
        },
      ],
    },
    {
      name: "Статьи",
      links: [
        {
          name: "Создать статью",
          icon: Plus,
          to: "/my/support/articles/add",
        },
        {
          name: "Все статьти",
          icon: ArrowRight,
          to: "/my/support/articles",
        },
      ],
    },
  ],
};

export { events, promo, news, products, marketing, support };
