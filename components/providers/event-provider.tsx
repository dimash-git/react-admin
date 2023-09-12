import { dateToUnix } from "@/lib/utils";
import React, { createContext, useState } from "react";

interface _EventContext {
  event: EventForm;
  setEvent: React.Dispatch<React.SetStateAction<EventForm>>;
}

const EventContext = createContext<_EventContext>({} as _EventContext);

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<EventForm>({
    name: "",
    desc: "",
    type: "offline",
    date: new Date(),
  } as EventForm);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
