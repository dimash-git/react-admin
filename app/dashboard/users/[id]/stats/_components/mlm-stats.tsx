"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { types } from "./records";
import { cn, dateToUnix } from "@/lib/utils";
import Chart from "./chart";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const MlmStatsChart = ({ id }: { id: string }) => {
  const [type, setType] = useState("personal_sales");

  const sevenDaysAgo = useMemo(() => {
    return new Date(Date.now() - 7 * 24 * 3600 * 1000);
  }, []);
  const [fromDate, setFromDate] = useState<Date | undefined>(sevenDaysAgo);
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  const [data, setData] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.post("/api/user/stats", {
          user_id: id,
          type,
          timestamp_from: fromDate ? dateToUnix(fromDate) : sevenDaysAgo,
          timestamp_to: toDate ? dateToUnix(toDate) : new Date(),
        });

        const { status, content } = res.data;
        if (status != 200) {
          throw new Error("Error Loading Mlm Statistics");
        }
        const { mlm_statistic } = content;
        setData(mlm_statistic);
      } catch (error) {
        console.error(error);
      }
    };
    getStats();
  }, [id, fromDate, toDate, type, sevenDaysAgo]);

  console.log(data);

  return (
    <>
      <div className="flex flex-col space-y-5 max-w-[200px]">
        <div className="flex flex-col space-y-2">
          <span className="text-[12px] font-medium uppercase">Начало</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="inputLike"
                size="inputLike"
                className={cn(
                  "w-full pl-3 text-left h-10",
                  fromDate && "text-muted-foreground"
                )}
              >
                {fromDate ? (
                  format(fromDate, "PPP")
                ) : (
                  <span>Выберите дату</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-[12px] font-medium uppercase">Конец</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="inputLike"
                size="inputLike"
                className={cn(
                  "w-full pl-3 text-left h-10",
                  toDate && "text-muted-foreground"
                )}
              >
                {toDate ? format(toDate, "PPP") : <span>Выберите дату</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          {Object.keys(types).map((key, idx) => (
            <button
              type="button"
              key={idx}
              className={cn(
                "w-full pb-[10px] text-[12px] font-medium uppercase border-b-[1px] border-[#8F9297] text-center transition-all",
                type === key ? "border-[#0072FF]" : null
              )}
              onClick={() => setType(key)}
            >
              {types[key as keyof typeof types]}
            </button>
          ))}
        </div>
        {data.length > 0 && <Chart data={data} />}
      </div>
    </>
  );
};

export default MlmStatsChart;
