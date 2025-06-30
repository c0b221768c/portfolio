import { Schedule } from "@/types/schedule";
import { ScheduleActions } from "./ScheduleActions";
import { ScheduleList } from "./ScheduleList";

interface SchedulePanelProps {
    schedules: Schedule[];
    onAdd: () => void;
    onEdit: (schedule: Schedule) => void;
    onDelete: (id: number) => void;
    onClearAll: () => void;
}

export function SchedulePanel({ schedules, onAdd, onEdit, onDelete, onClearAll }: SchedulePanelProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl row-span-2 grid grid-rows-[1fr_auto] w-full h-full overflow-hidden">
            <ScheduleList 
                schedules={schedules}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <ScheduleActions 
                onAdd={onAdd}
                onClearAll={onClearAll}
            />
        </div>
    )
}