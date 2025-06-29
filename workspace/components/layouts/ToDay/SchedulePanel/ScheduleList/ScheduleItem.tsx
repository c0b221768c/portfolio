// 開始時間、終了時間、カテゴリ、ラベル、アクションボタン
import { ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
export function ScheduleItem() {
    return (
        // そとわく: Gridコンテナとして定義
        <div className="grid grid-cols-[auto_1fr] items-stretch gap-4">
            
            {/* 開始時間、終了時間そとわく: Gridの1列目 */}
            <div className="flex flex-col justify-between text-xs text-neutral-900 py-1">
                <div>AM 00:00</div>
                <div>AM 07:30</div>
            </div>

            {/* ラベルそとわく: Gridの2列目。この要素自体もGridコンテナ */}
            <div className="w-full h-full px-5 py-2 rounded-xl flex justify-between items-center border border-red-400 bg-red-50">
                {/* left */}
                <div className="flex items-center gap-3 h-full">
                    <div className="h-full w-1 bg-red-500 rounded-full" />
                    <p className="text-lg text-neutral-900">Sleep</p>
                </div>
                {/* right */}
                <div className="flex items-center gap-3 text-neutral-600 text-xs">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <ChevronRightIcon className="size-2" />
                        <p>Sub Category</p>
                    </div>
                    <EllipsisVerticalIcon className="size-6" />
                </div>
            </div>
        </div>
    )
}