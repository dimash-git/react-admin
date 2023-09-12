"use client";

import { EventProvider } from "@/components/providers/event-provider";

const EventAddLayout = ({ children }: { children: React.ReactNode }) => {
  return <EventProvider>{children}</EventProvider>;
};

export default EventAddLayout;
