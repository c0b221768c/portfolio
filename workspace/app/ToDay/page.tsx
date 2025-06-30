"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Header } from "@/components/ui/Header";
import { CategoryPanel } from "@/features/category/CategoryPanel";
import { SchedulePanel } from "@/features/schedule/SchedulePanel";
import { DonutChart, Segment } from "@/features/schedule/DonutChart";
import { ScheduleModal } from "@/features/schedule/ScheduleModal";
import { Schedule } from "@/types/schedule";

const colorToFillClass: { [key: string]: string } = {
  // ... (colorToFillClassの内容は変更なし)
  red: "fill-red-400 dark:fill-red-600",
  orange: "fill-orange-400 dark:fill-orange-600",
  amber: "fill-amber-400 dark:fill-amber-600",
  yellow: "fill-yellow-400 dark:fill-yellow-600",
  lime: "fill-lime-400 dark:fill-lime-600",
  green: "fill-green-400 dark:fill-green-600",
  emerald: "fill-emerald-400 dark:fill-emerald-600",
  teal: "fill-teal-400 dark:fill-teal-600",
  cyan: "fill-cyan-400 dark:fill-cyan-600",
  sky: "fill-sky-400 dark:fill-sky-600",
  blue: "fill-blue-400 dark:fill-blue-600",
  indigo: "fill-indigo-400 dark:fill-indigo-600",
  violet: "fill-violet-400 dark:fill-violet-600",
  purple: "fill-purple-400 dark:fill-purple-600",
  fuchsia: "fill-fuchsia-400 dark:fill-fuchsia-600",
  pink: "fill-pink-400 dark:fill-pink-600",
  rose: "fill-rose-400 dark:fill-rose-600",
};

const initialSchedules: Schedule[] = [
    { id: 1, title: "睡眠", start: "00:00", end: "07:00", color: "indigo" },
    { id: 2, title: "朝食と支度", start: "07:00", end: "08:30", color: "red" },
    { id: 3, title: "仕事", start: "09:00", end: "12:00", color: "orange" },
    { id: 4, title: "昼食", start: "12:00", end: "13:00", color: "red" },
    { id: 5, title: "仕事", start: "13:00", end: "17:30", color: "orange" },
    { id: 6, title: "ジム", start: "18:30", end: "20:00", color: "teal" },
    { id: 7, title: "夕食", start: "20:00", end: "21:00", color: "red" },
    { id: 8, title: "リラックス", start: "21:00", end: "24:00", color: "purple" },
];

export default function ToDay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [circleSize, setCircleSize] = useState(0);
    
    const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

    const handleAdd = () => {
        setEditingSchedule(null);
        setIsModalOpen(true);
    };

    const handleEdit = (schedule: Schedule) => {
        setEditingSchedule(schedule);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setSchedules(schedules.filter(s => s.id !== id));
    };

    const handleClearAll = () => {
        setSchedules([]);
    };
    
    const handleSave = (scheduleData: Omit<Schedule, 'id'> | Schedule) => {
        if ('id' in scheduleData) {
            setSchedules(schedules.map(s => s.id === scheduleData.id ? scheduleData : s));
        } else {
            const newSchedule: Schedule = { id: Date.now(), ...scheduleData };
            setSchedules([...schedules, newSchedule].sort((a,b) => a.start.localeCompare(b.start)));
        }
        setIsModalOpen(false);
    };

    const segments: Segment[] = useMemo(() => {
        return schedules.map(s => ({
            start: s.start,
            end: s.end,
            className: colorToFillClass[s.color] || "fill-gray-400"
        }));
    }, [schedules]);

    useEffect(() => {
        const updateCircleSize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setCircleSize(Math.min(width, height));
            }
        };
        updateCircleSize();
        const resizeObserver = new ResizeObserver(updateCircleSize);
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <>
            <div className="grid grid-rows-[6vh_94vh]">
                <Header />
                <main className="flex-1 p-20 grid grid-cols-[65fr_45fr] grid-rows-[4fr_1fr] gap-20">
                    <div ref={containerRef} className="w-full bg-translate grid place-items-center bg-white dark:bg-slate-900 rounded-xl">
                        <DonutChart segments={segments} size={circleSize} innerRadius={0.8}/>
                    </div>
                    <SchedulePanel
                        schedules={schedules}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClearAll={handleClearAll}
                    />
                    <CategoryPanel />
                </main>
            </div>
            <ScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                scheduleToEdit={editingSchedule}
            />
        </>
    );
}