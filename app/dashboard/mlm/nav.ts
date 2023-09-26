export const mlmBaseUrl = "/dashboard/mlm";

export const mlmTabs = {
  mlm: [
    {
      to: mlmBaseUrl + "",
      slug: "mlm",
      name: "МЛМ Квалификации",
    },
    {
      to: mlmBaseUrl + "/manual",
      slug: "manual",
      name: "Ручной  перевод пользователя",
    },
  ],
};

export const mlmBreadcrumbs = {
  mlm: [
    {
      to: "/dashboard/mlm",
      name: "МЛМ",
    },
  ],
};
