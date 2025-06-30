"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Schedule, ScheduleColor, availableColors } from "@/types/schedule";
import { Button } from "@/components/ui/Button"; // Buttonのパスを更新
import categoryData from '@/db/category/en.json';

// ... (ファイルの中身は変更なし)
interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (schedule: Omit<Schedule, 'id'> | Schedule) => void;
    scheduleToEdit: Schedule | null;
}

const categories = Object.entries(categoryData)
    .filter(([, value]) => value.title)
    .map(([color, { title }]) => ({ color: color as ScheduleColor, title }));


export function ScheduleModal({ isOpen, onClose, onSave, scheduleToEdit }: ScheduleModalProps) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('09:00');
    const [end, setEnd] = useState('10:00');
    const [color, setColor] = useState<ScheduleColor>('blue');

    useEffect(() => {
        if (scheduleToEdit) {
            setTitle(scheduleToEdit.title);
            setStart(scheduleToEdit.start);
            setEnd(scheduleToEdit.end);
            setColor(scheduleToEdit.color as ScheduleColor);
        } else {
            setTitle('');
            setStart('09:00');
            setEnd('10:00');
            setColor('blue');
        }
    }, [scheduleToEdit, isOpen]);

    const handleSave = () => {
        if (!title) return;
        const scheduleData = {
            title,
            start,
            end,
            color,
        };
        
        if(scheduleToEdit) {
            onSave({ id: scheduleToEdit.id, ...scheduleData });
        } else {
            onSave(scheduleData);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                    {scheduleToEdit ? 'Edit Schedule' : 'Add New Schedule'}
                                </DialogTitle>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                                            <input
                                                type="time"
                                                id="start"
                                                value={start}
                                                onChange={(e) => setStart(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="end" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                                            <input
                                                type="time"
                                                id="end"
                                                value={end}
                                                onChange={(e) => setEnd(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                        <select
                                            id="category"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value as ScheduleColor)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.color} value={cat.color}>{cat.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                     <Button variant="outlined" color="neutral" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        {scheduleToEdit ? 'Save Changes' : 'Add Schedule'}
                                    </Button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}