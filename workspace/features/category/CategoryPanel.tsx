import { CategoryItem } from './CategoryItem';
import categoryData from '@/db/category/en.json';

export function CategoryPanel() {
    const categories = Object.entries(categoryData).filter(
        ([, value]) => value.title && value.title.length > 0
    );

    return (
        <div className="dark:bg-slate-900 bg-white rounded-xl p-3 flex flex-wrap gap-3">
            {categories.map(([color, { title }]) => (
                <CategoryItem key={title} color={color} label={title} />
            ))}
        </div>
    )
}