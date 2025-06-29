import { ScheduleItem } from "./ScheduleItem";

export function ScheduleList() {
    return(
        <div className="overflow-auto p-5">
            <div className="flex flex-col gap-5">
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
                <ScheduleItem/>
            </div>
        </div>
    )
}