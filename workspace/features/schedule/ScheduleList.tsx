import { Schedule } from "@/types/schedule";
import { ScheduleItem } from "./ScheduleItem";

interface ScheduleListProps {
    schedules: Schedule[];
    onEdit: (schedule: Schedule) => void;
    onDelete: (id: number) => void;
}

export function ScheduleList({ schedules, onEdit, onDelete }: ScheduleListProps) {
    return(
        <div className="overflow-auto p-5">
            {schedules.length > 0 ? (
                <div className="flex flex-col gap-5">
                    {schedules.map(schedule => (
                        <ScheduleItem 
                            key={schedule.id} 
                            schedule={schedule}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="h-full grid place-content-center">
                    <p className="text-slate-400">No schedules for today.</p>
                </div>
            )}
        </div>
    )
}