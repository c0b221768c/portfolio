"use client"

import { ThemeToggle } from "./ThemeToggle"
import { TimeModeSwitch } from "./TimeModeSwitch"
import { formatDateParts } from "@/lib/utils/formatDateParts"

export function Header() {
    const [month, day, year] = formatDateParts(new Date(), ["monthName", "dd", "yyyy"], {
        monthFormat: "short"
    })

    return (
        <header className="grid grid-cols-[1fr_auto_1fr] w-full px-4 border-b border-neutral-200 items-center">
            {/* 左端: ToDay */}
            <p className="text-lg font-bold tracking-wide justify-self-start">ToDay</p>

            {/* 中央: today date */}
            <p className="text-center tracking-wide">{`${month}. ${day}, ${year}`}</p>

            {/* 右端: モジュール */}
            <div className="flex items-center gap-3 justify-self-end">
                <TimeModeSwitch />
                <ThemeToggle />
            </div>
        </header>
    )
}
