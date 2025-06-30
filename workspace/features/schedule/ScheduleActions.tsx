import { Button } from "@/components/ui/Button"; // Buttonのパスを更新
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ScheduleActionsProps {
    onAdd: () => void;
    onClearAll: () => void;
}

export function ScheduleActions({ onAdd, onClearAll }: ScheduleActionsProps) {
    return (
        <div className="p-3 grid grid-cols-[2fr_5fr] gap-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button
                color="danger"
                variant="outlined"
                size="sm"
                leftIcon={<TrashIcon/>}
                onClick={onClearAll}
            >Clear All</Button>
            <Button
                color="primary"
                variant="filled"
                size="sm"
                leftIcon={<PlusIcon/>}
                onClick={onAdd}
            >Add Schedule</Button>
        </div>
    )
}