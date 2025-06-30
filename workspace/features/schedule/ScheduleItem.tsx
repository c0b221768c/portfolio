import { Schedule } from "@/types/schedule";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cn } from "@/lib/utils/cn";

const colorMap: { [key: string]: { border: string, bg: string, text: string, dot: string } } = {
  // ... (colorMapの内容は変更なし)
  red:    { border: "border-red-400",    bg: "bg-red-50 dark:bg-red-950",       text: "text-red-900 dark:text-red-200",    dot: "bg-red-500" },
  orange: { border: "border-orange-400", bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-900 dark:text-orange-200", dot: "bg-orange-500" },
  amber:  { border: "border-amber-400",  bg: "bg-amber-50 dark:bg-amber-950",  text: "text-amber-900 dark:text-amber-200",  dot: "bg-amber-500" },
  yellow: { border: "border-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950", text: "text-yellow-900 dark:text-yellow-200", dot: "bg-yellow-500" },
  lime:   { border: "border-lime-400",   bg: "bg-lime-50 dark:bg-lime-950",     text: "text-lime-900 dark:text-lime-200",     dot: "bg-lime-500" },
  green:  { border: "border-green-400",  bg: "bg-green-50 dark:bg-green-950",  text: "text-green-900 dark:text-green-200",  dot: "bg-green-500" },
  emerald:{ border: "border-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-950",text: "text-emerald-900 dark:text-emerald-200",dot: "bg-emerald-500" },
  teal:   { border: "border-teal-400",   bg: "bg-teal-50 dark:bg-teal-950",     text: "text-teal-900 dark:text-teal-200",     dot: "bg-teal-500" },
  cyan:   { border: "border-cyan-400",   bg: "bg-cyan-50 dark:bg-cyan-950",     text: "text-cyan-900 dark:text-cyan-200",     dot: "bg-cyan-500" },
  sky:    { border: "border-sky-400",    bg: "bg-sky-50 dark:bg-sky-950",       text: "text-sky-900 dark:text-sky-200",       dot: "bg-sky-500" },
  blue:   { border: "border-blue-400",   bg: "bg-blue-50 dark:bg-blue-950",     text: "text-blue-900 dark:text-blue-200",     dot: "bg-blue-500" },
  indigo: { border: "border-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-900 dark:text-indigo-200", dot: "bg-indigo-500" },
  violet: { border: "border-violet-400", bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-900 dark:text-violet-200", dot: "bg-violet-500" },
  purple: { border: "border-purple-400", bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-900 dark:text-purple-200", dot: "bg-purple-500" },
  fuchsia:{ border: "border-fuchsia-400",bg: "bg-fuchsia-50 dark:bg-fuchsia-950",text: "text-fuchsia-900 dark:text-fuchsia-200",dot: "bg-fuchsia-500" },
  pink:   { border: "border-pink-400",   bg: "bg-pink-50 dark:bg-pink-950",     text: "text-pink-900 dark:text-pink-200",     dot: "bg-pink-500" },
  rose:   { border: "border-rose-400",   bg: "bg-rose-50 dark:bg-rose-950",     text: "text-rose-900 dark:text-rose-200",     dot: "bg-rose-500" },
  gray:   { border: "border-gray-400",   bg: "bg-gray-50 dark:bg-gray-950",     text: "text-gray-900 dark:text-gray-200",     dot: "bg-gray-500" },
};

interface ScheduleItemProps {
    schedule: Schedule;
    onEdit: (schedule: Schedule) => void;
    onDelete: (id: number) => void;
}

export function ScheduleItem({ schedule, onEdit, onDelete }: ScheduleItemProps) {
    // ... (コンポーネントのロジックは変更なし)
    const { start, end, title, color } = schedule;
    const colorClasses = colorMap[color] || colorMap.gray;

    return (
        <div className="grid grid-cols-[auto_1fr] items-stretch gap-4">
            <div className="flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400 py-1 text-center">
                <span>{start}</span>
                <span>{end}</span>
            </div>
            <div className={cn("w-full h-full px-5 py-2 rounded-xl flex justify-between items-center border", colorClasses.border, colorClasses.bg)}>
                <div className="flex items-center gap-3 h-full">
                    <div className={cn("h-full w-1 rounded-full", colorClasses.dot)} />
                    <p className={cn("text-lg font-medium", colorClasses.text)}>{title}</p>
                </div>
                <Menu as="div" className="relative">
                    <MenuButton className="p-1 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                        <EllipsisVerticalIcon className="size-6" />
                    </MenuButton>
                    <MenuItems 
                        anchor="bottom end" 
                        className="w-32 mt-1 origin-top-right rounded-xl border border-slate-200 bg-white p-1 text-sm text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shadow-lg focus:outline-none"
                    >
                        <MenuItem>
                            <button
                                onClick={() => onEdit(schedule)}
                                className="w-full flex items-center gap-2 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                                <PencilIcon className="size-4" />
                                <span>Edit</span>
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => onDelete(schedule.id)}
                                className="w-full flex items-center gap-2 rounded-md p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                                <TrashIcon className="size-4" />
                                <span>Delete</span>
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}