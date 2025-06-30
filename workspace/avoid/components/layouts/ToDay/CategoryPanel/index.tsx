// CategoryPanel.tsx

import { CategoryItem } from '../../../../../features/category/CategoryItem';
import categoryData from '@/db/category/en.json';

export function CategoryPanel() {
    // JSONデータからtitleが空でないカテゴリのみをフィルタリング
    const categories = Object.entries(categoryData).filter(
        ([, value]) => value.title && value.title.length > 0
    );

    return (
        <div className="dark:bg-slate-900 bg-white rounded-xl p-3 flex flex-wrap gap-3">
            {/*
              フィルタリングしたカテゴリをループし、
              各カテゴリの「色(color)」と「タイトル(title)」を使って
              CategoryItemを1つずつ生成します。
            */}
            {categories.map(([color, { title }]) => (
                <CategoryItem key={title} color={color} label={title} />
            ))}
        </div>
    )
}