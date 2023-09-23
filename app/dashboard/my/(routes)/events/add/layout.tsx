import { EventProvider } from "@/app/dashboard/my/(routes)/events/_components/event-provider";

const EventAddLayout = ({ children }: { children: React.ReactNode }) => {
  return <EventProvider>{children}</EventProvider>;
};

export default EventAddLayout;
