"use client"

import { Switch } from "@headlessui/react"
import { useState } from "react"

export function TimeModeSwitch() {
  const [is24Hour, setIs24Hour] = useState(false)

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
      <span
        className={`text-sm ${!is24Hour ? "text-cyan-400 dark:text-cyan-500" : "text-neutral-400 dark:text-neutral-500"}`}
      >
        12
      </span>
      <Switch
        checked={is24Hour}
        onChange={setIs24Hour}
        className="relative flex h-6 w-12 cursor-pointer rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 p-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-4 rounded-full bg-white dark:bg-black shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
            is24Hour ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </Switch>
      <span
        className={`text-sm ${is24Hour ? "text-emerald-400 dark:text-emerald-500" : "text-neutral-400 dark:text-neutral-500"}`}
      >
        24
      </span>
    </div>
  )
}
