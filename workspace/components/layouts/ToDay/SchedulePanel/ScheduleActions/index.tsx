import { Button } from "@/components/base/Button";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function ScheduleActions() {
    return (
        <div className="p-3 grid grid-cols-[2fr_5fr] gap-4">
            <Button
                color="danger"
                variant="outlined"
                size="sm"
                leftIcon={<TrashIcon/>}
            >Clear All</Button>
            <Button
                color="primary"
                variant="filled"
                size="sm"
                leftIcon={<PlusIcon/>}
            >Add Schedule</Button>
        </div>
    )
}