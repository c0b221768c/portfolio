"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Header } from "@/components/ui/Header";
import { CategoryPanel } from "@/features/category/CategoryPanel";
import { SchedulePanel } from "@/features/schedule/SchedulePanel";
import { DonutChart, Segment } from "@/features/schedule/DonutChart";
import { ScheduleModal } from "@/features/schedule/ScheduleModal";
import { Schedule } from "@/types/schedule";

// colorToFillClassの定義 (変更なし)
const colorToFillClass: { [key: string]: string } = {
  red: "fill-red-400 dark:fill-red-300",
  orange: "fill-orange-400 dark:fill-orange-300",
  amber: "fill-amber-400 dark:fill-amber-300",
  yellow: "fill-yellow-400 dark:fill-yellow-300",
  lime: "fill-lime-400 dark:fill-lime-300",
  green: "fill-green-400 dark:fill-green-300",
  emerald: "fill-emerald-400 dark:fill-emerald-300",
  teal: "fill-teal-400 dark:fill-teal-300",
  cyan: "fill-cyan-400 dark:fill-cyan-300",
  sky: "fill-sky-400 dark:fill-sky-300",
  blue: "fill-blue-400 dark:fill-blue-300",
  indigo: "fill-indigo-400 dark:fill-indigo-300",
  violet: "fill-violet-400 dark:fill-violet-300",
  purple: "fill-purple-400 dark:fill-purple-300",
  fuchsia: "fill-fuchsia-400 dark:fill-fuchsia-300",
  pink: "fill-pink-400 dark:fill-pink-300",
  rose: "fill-rose-400 dark:fill-rose-300",
};

// ✨ 初期データに subCategory を追加
const initialSchedules: Schedule[] = [
    { id: 1, title: "睡眠", start: "00:00", end: "07:00", color: "indigo", subCategory: "Sleep" },
    { id: 2, title: "朝食", start: "07:00", end: "08:30", color: "red", subCategory: "Breakfast" },
    { id: 3, title: "開発業務", start: "09:00", end: "12:00", color: "orange", subCategory: "Work" },
    { id: 4, title: "昼食", start: "12:00", end: "13:00", color: "red", subCategory: "Lunch" },
    { id: 5, title: "会議", start: "13:00", end: "14:00", color: "orange", subCategory: "Meeting" },
    { id: 6, title: "ジム", start: "18:30", end: "20:00", color: "teal", subCategory: "Gym" },
    { id: 7, title: "夕食", start: "20:00", end: "21:00", color: "red", subCategory: "Dinner" },
    { id: 8, title: "お風呂", start: "21:00", end: "22:00", color: "indigo", subCategory: "Bath" },
    { id: 9, title: "趣味", start: "22:00", end: "24:00", color: "cyan", subCategory: "Gaming" },
];

export default function ToDay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [circleSize, setCircleSize] = useState(0);
    
    // stateとhandlerの定義 (handleSaveを新しいデータ構造に対応)
    const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

    const handleAdd = () => { /* 変更なし */ setEditingSchedule(null); setIsModalOpen(true); };
    const handleEdit = (schedule: Schedule) => { /* 変更なし */ setEditingSchedule(schedule); setIsModalOpen(true); };
    const handleDelete = (id: number) => { /* 変更なし */ setSchedules(schedules.filter(s => s.id !== id)); };
    const handleClearAll = () => { /* 変更なし */ setSchedules([]); };
    
    const handleSave = (scheduleData: Omit<Schedule, 'id'> | Schedule) => {
        if ('id' in scheduleData) {
            setSchedules(schedules.map(s => s.id === scheduleData.id ? scheduleData : s));
        } else {
            const newSchedule: Schedule = { id: Date.now(), ...scheduleData };
            setSchedules([...schedules, newSchedule].sort((a,b) => a.start.localeCompare(b.start)));
        }
        setIsModalOpen(false);
    };

    const segments: Segment[] = useMemo(() => { /* 変更なし */
        return schedules.map(s => ({
            start: s.start,
            end: s.end,
            className: colorToFillClass[s.color] || "fill-neutral-400 dark:fill-neutral-300"
        }));
    }, [schedules]);

    useEffect(() => { /* 変更なし */
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
                {/* ✨ CategoryPanelのclassNameを削除し、内部でレイアウトを完結させる */}
                <main className="flex-1 p-20 grid grid-cols-[65fr_45fr] grid-rows-[4fr_1fr] gap-20">
                    <div ref={containerRef} className="w-full bg-translate grid place-items-center bg-white dark:bg-black rounded-xl">
                        <DonutChart segments={segments} size={circleSize} innerRadius={0.8}/>
                    </div>
                    <SchedulePanel
                        schedules={schedules}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClearAll={handleClearAll}
                        className="row-span-2"
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