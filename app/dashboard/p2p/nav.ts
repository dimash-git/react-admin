export const p2pBaseUrl = "/dashboard/p2p";

export const p2pTabs = {
  appeals_complaints: [
    {
      to: p2pBaseUrl + "/appeals",
      slug: "appeals",
      name: "Все мероприятия",
    },
    {
      to: p2pBaseUrl + "/complaints",
      slug: "complaints",
      name: "жалобы на чат",
    },
  ],
};
