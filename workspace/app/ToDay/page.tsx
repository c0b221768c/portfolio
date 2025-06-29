"use client"

import { CategoryPanel } from "@/components/layouts/ToDay/CategoryPanel"
import { Header } from "@/components/layouts/ToDay/Header"
import { SchedulePannel } from "@/components/layouts/ToDay/SchedulePanel"
import { useEffect, useRef, useState } from "react"
import { DonutChart, Segment } from "@/components/layouts/ToDay/DonutChart"

export default function ToDay() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [circleSize, setCircleSize] = useState(0)

    useEffect(() => {
        const updateCircleSize = () => {
            if (containerRef.current) {
                const parent = containerRef.current
                const { width, height } = parent.getBoundingClientRect()
                const minSize = Math.min(width, height)
                setCircleSize(minSize)
            }
        }

        updateCircleSize()

        const resizeObserver = new ResizeObserver(updateCircleSize)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    const segments: Segment[] = [
        { start: "00:00", end: "07:00", className:"fill-red-400 dark:fill-red-600"},
        { start: "07:00", end: "10:00", className: "fill-orange-400 dark:fill-orange-600"},
        {start: "10:00", end:"14:00", className:"fill-green-400 dark:fill-green-600"},
        {start: "14:00", end:"16:00", className:"fill-red-400 dark:fill-red-600"},
        {start: "16:00", end:"24:00", className:"fill-teal-400 dark:fill-teal-600"}
    ]

    return(
        <div className="grid grid-rows-[6vh_94vh]">
            <Header /> {/** 5% */}
            <div className="flex-1 p-20 grid grid-cols-[65fr_45fr] grid-rows-[4fr_1fr] gap-20"> {/** 95% */}
                <div ref={containerRef} className="w-full bg-translate grid place-items-center bg-white rounded-xl">
                    <DonutChart segments={segments} size={circleSize} innerRadius={0.8}/>
                </div>
                <SchedulePannel />
                <CategoryPanel />
            </div>
        </div>
    )
}