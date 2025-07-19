import type { FC } from "react";
import type { Month } from "../types/type";
import { TimelineCharts } from "./TimelineCharts";

interface TimelineViewProps {
  allMonths: Month[];
}

export const TimelineView: FC<TimelineViewProps> = ({ allMonths }) => {
  return (
    <div className="space-y-8">
      <TimelineCharts allMonths={allMonths} />
    </div>
  );
};
