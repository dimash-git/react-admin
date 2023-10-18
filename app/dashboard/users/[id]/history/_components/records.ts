export const types: Record<Transaction["type"], string> = {
  buy: "Покупка",
  withdrawal: "Вывод",
  transfer_p2p: "Перевод P2P",
  frozen_p2p: "Замороженный P2P",
  mlm_percent: "MLM процент",
  mlm_matching: "MLM совпадение",
  other: "Другое",
};

export const statuses: Record<Transaction["status"], string> = {
  success: "Выполнен успешно",
  process: "В обработке",
  cancelled: "Отменен",
};
