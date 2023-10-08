"use client";

import { cn } from "@/lib/utils";

const MessageCard = ({
  message,
  users,
}: {
  message: Message;
  users: {
    name: string;
    id: string;
  }[];
}) => {
  const [orderOwner, offerOwner] = users;
  const date = new Date(message.create_timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("ru-RU", options);
  const formattedDateTime = formattedDate.replace(/\//g, ".");

  return (
    <div
      className={cn(
        "flex flex-col space-y-[10px] py-[5px] px-[10px] rounded-[10px]",
        message.user_id == offerOwner.id ? "bg-[#064DA6]" : "bg-[#455580]"
      )}
    >
      <div className="flex justify-between">
        <span className="text-[10px] font-bold">
          {message.user_id == orderOwner.id ? orderOwner.name : offerOwner.name}{" "}
        </span>
        <span className="text-[10px] font-medium">{formattedDateTime}</span>
      </div>
      <div className="text-[10px] font-medium">{message.text}</div>
    </div>
  );
};

const Chat = ({
  messages,
  users,
}: {
  messages: Message[];
  users: {
    name: string;
    id: string;
  }[];
}) => {
  return (
    <div className="p-[15px] bg-[#2D3D52] rounded-[20px] max-w-[332px]">
      <div className="flex flex-col space-y-[10px]">
        <div className="text-[20px] font-semibold">ЧАТ</div>
        <span className="block w-full bg-[#455580] h-[1px]"></span>
      </div>
      <div className="flex flex-col space-y-[10px] pt-[10px] max-h-[320px] overflow-y-scroll scrollbar pr-1">
        {messages &&
          messages.map((message, idx) => (
            <MessageCard key={idx} message={message} users={users} />
          ))}
      </div>
    </div>
  );
};

export default Chat;
