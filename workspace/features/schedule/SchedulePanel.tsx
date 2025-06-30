import { Schedule } from "@/types/schedule";
import { ScheduleActions } from "./ScheduleActions";
import { ScheduleList } from "./ScheduleList";
import { cn } from "@/lib/utils/cn";

interface SchedulePanelProps {
    schedules: Schedule[];
    onAdd: () => void;
    onEdit: (schedule: Schedule) => void;
    onDelete: (id: number) => void;
    onClearAll: () => void;
    className?: string; // classNameを受け取れるようにする
}

export function SchedulePanel({ schedules, onAdd, onEdit, onDelete, onClearAll, className }: SchedulePanelProps) {
    return (
        // 受け取ったclassNameを適用する
        <div className={cn("bg-white dark:bg-black rounded-xl grid grid-rows-[1fr_auto] w-full h-full overflow-hidden", className)}>
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