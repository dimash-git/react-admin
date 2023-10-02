"use client";

import React, { createContext, useState } from "react";
import { EventValues } from "../schema";
interface EvtContext {
  event: EventValues;
  setEvent: React.Dispatch<React.SetStateAction<EventValues>>;
}

const EventContext = createContext<EvtContext>({} as EvtContext);

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<EventValues>({
    name: "",
    desc: "",
    type: "offline",
    date: new Date(),
  } as EventValues);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
