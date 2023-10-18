"use client";

import React, { createContext, useState } from "react";
import * as z from "zod";
import formSchema from "../schema";
interface EvtContext {
  event: z.infer<typeof formSchema>;
  setEvent: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
}

const EventContext = createContext<EvtContext>({} as EvtContext);

const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<z.infer<typeof formSchema>>(
    {} as z.infer<typeof formSchema>
  );

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
