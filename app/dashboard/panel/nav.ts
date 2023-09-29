import Plus from "@/public/icons/plus.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import AccIcon from "@/public/icons/acc.svg";

export const panelBaseUrl = "/dashboard/panel";

export const panelSections = {
  acc: {
    name: "Акаунты администраторов",
    icon: AccIcon,
    links: [
      {
        name: "Создать аккаунт ",
        icon: Plus,
        to: panelBaseUrl + "/acc/add",
        slug: "add_acct",
      },
      {
        name: "Все аккаунты администраторов",
        icon: ArrowRight,
        to: panelBaseUrl + "/acc",
        slug: "list_acc",
      },
    ],
  },
};
