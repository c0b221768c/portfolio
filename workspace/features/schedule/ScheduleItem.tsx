import { Schedule } from "@/types/schedule";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cn } from "@/lib/utils/cn";

// colorMapの定義 (変更なし)
const colorMap: { [key: string]: { border: string, bg: string, text: string, dot: string } } = {
  red:    { border: "dark:border-red-300     border-red-400",    bg: "bg-red-50     dark:bg-red-950",    text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-red-400"     },
  orange: { border: "dark:border-orange-300  border-orange-400", bg: "bg-orange-50  dark:bg-orange-950", text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-orange-400"  },
  amber:  { border: "dark:border-amber-300   border-amber-400",  bg: "bg-amber-50   dark:bg-amber-950",  text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-amber-400"   },
  yellow: { border: "dark:border-yellow-300  border-yellow-400", bg: "bg-yellow-50  dark:bg-yellow-950", text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-yellow-400"  },
  lime:   { border: "dark:border-lime-300    border-lime-400",   bg: "bg-lime-50    dark:bg-lime-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-lime-400"    },
  green:  { border: "dark:border-green-300   border-green-400",  bg: "bg-green-50   dark:bg-green-950",  text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-green-400"   },
  emerald:{ border: "dark:border-emerald-300 border-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-950",text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-emerald-400" },
  teal:   { border: "dark:border-teal-300    border-teal-400",   bg: "bg-teal-50    dark:bg-teal-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-teal-400"    },
  cyan:   { border: "dark:border-cyan-300    border-cyan-400",   bg: "bg-cyan-50    dark:bg-cyan-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-cyan-400"    },
  sky:    { border: "dark:border-sky-300     border-sky-400",    bg: "bg-sky-50     dark:bg-sky-950",    text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-sky-400"     },
  blue:   { border: "dark:border-blue-300    border-blue-400",   bg: "bg-blue-50    dark:bg-blue-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-blue-400"    },
  indigo: { border: "dark:border-indigo-300  border-indigo-400", bg: "bg-indigo-50  dark:bg-indigo-950", text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-indigo-400"  },
  violet: { border: "dark:border-violet-300  border-violet-400", bg: "bg-violet-50  dark:bg-violet-950", text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-violet-400"  },
  purple: { border: "dark:border-purple-300  border-purple-400", bg: "bg-purple-50  dark:bg-purple-950", text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-purple-400"  },
  fuchsia:{ border: "dark:border-fuchsia-300 border-fuchsia-400",bg: "bg-fuchsia-50 dark:bg-fuchsia-950",text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-fuchsia-400" },
  pink:   { border: "dark:border-pink-300    border-pink-400",   bg: "bg-pink-50    dark:bg-pink-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-pink-400"    },
  rose:   { border: "dark:border-rose-300    border-rose-400",   bg: "bg-rose-50    dark:bg-rose-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-rose-400"    },
  gray:   { border: "dark:border-gray-300    border-gray-400",   bg: "bg-gray-50    dark:bg-gray-950",   text: "text-neutral-900 dark:text-neutral-100",  dot: "bg-gray-400"    },
};   

interface ScheduleItemProps {
    schedule: Schedule;
    onEdit: (schedule: Schedule) => void;
    onDelete: (id: number) => void;
}

export function ScheduleItem({ schedule, onEdit, onDelete }: ScheduleItemProps) {
    const { start, end, title, color, subCategory } = schedule; // subCategory を受け取る
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
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", colorClasses.dot)} />
                        <ChevronRightIcon className="size-2" />
                        <p>{subCategory}</p> {/* ✨ 表示を subCategory に変更 */}
                    </div>
                    <Menu as="div" className="relative">
                        <MenuButton className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                            <EllipsisVerticalIcon className="size-6" />
                        </MenuButton>
                        <MenuItems anchor="bottom end" className="w-32 mt-1 origin-top-right rounded-xl border border-slate-200 bg-white p-1 text-sm text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shadow-lg focus:outline-none z-10">
                            <MenuItem>
                                <button onClick={() => onEdit(schedule)} className="w-full flex items-center gap-2 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                                    <PencilIcon className="size-4" />
                                    <span>Edit</span>
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button onClick={() => onDelete(schedule.id)} className="w-full flex items-center gap-2 rounded-md p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950">
                                    <TrashIcon className="size-4" />
                                    <span>Delete</span>
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    )
}