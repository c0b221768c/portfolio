"use client";

import { Button } from "@/components/base/Button";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils/cn";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const style = tv({
	slots: {
		sun: "dark:hidden",
		moon: "hidden dark:block",
	},
});

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";
	const { sun, moon } = style();
	return (
		<Button
			shape="circle"
			variant="ghost"
			color="neutral"
			isIconOnly={true}
			size="md"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			icon={
				isDark ? (
					<MoonIcon className={cn(moon)} />
				) : (
					<SunIcon className={cn(sun)} />
				)
			}
			className="text-orange-500 dark:text-yellow-500"
		/>
	);
}
