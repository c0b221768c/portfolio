import { CategoryItem } from './CategoryItem';
import categoryData from '@/db/category/en.json';
import { cn } from '@/lib/utils/cn';

interface CategoryPanelProps {
    className?: string;
}

export function CategoryPanel({ className }: CategoryPanelProps) {
    const categories = Object.entries(categoryData).filter(
        ([, value]) => value.title && value.title.length > 0
    );

    return (
        // ✨ content-start を追加して、アイテムをコンテナの上部に寄せる
        <div className={cn("dark:bg-black bg-white rounded-xl p-3 flex flex-wrap gap-3 content-start", className)}>
            {categories.map(([color, { title }]) => (
                <CategoryItem key={title} color={color} label={title} />
            ))}
        </div>
    )
}