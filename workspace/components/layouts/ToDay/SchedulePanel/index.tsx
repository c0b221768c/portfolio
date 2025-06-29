import { ScheduleActions } from "./ScheduleActions";
import { ScheduleList } from "./ScheduleList";

export function SchedulePannel() {
    return (
        <div className="bg-white rounded-xl row-span-2 grid grid-rows-[9fr_1fr] w-full h-full">
            {/* list */}
            <ScheduleList />
            {/* actions */}
            <ScheduleActions />
        </div>
    )
}