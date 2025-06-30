// CategoryItem.tsx

// JSONのキー（色の名前）とTailwind CSSのクラスを対応させるためのオブジェクト
const colorMap: { [key: string]: string } = {
  red: "bg-red-400 dark:bg-red-300",
  orange: "bg-orange-400 dark:bg-orange-300",
  amber: "bg-amber-400 dark:bg-amber-300",
  yellow: "bg-yellow-400 dark:bg-yellow-300",
  lime: "bg-lime-400 dark:bg-lime-300",
  green: "bg-green-400 dark:bg-green-300",
  emerald: "bg-emerald-400 dark:bg-emerald-300",
  teal: "bg-teal-400 dark:bg-teal-300",
  cyan: "bg-cyan-400 dark:bg-cyan-300",
  sky: "bg-sky-400 dark:bg-sky-300",
  blue: "bg-blue-400 dark:bg-blue-300",
  indigo: "bg-indigo-400 dark:bg-indigo-300",
  violet: "bg-violet-400 dark:bg-violet-300",
  purple: "bg-purple-400 dark:bg-purple-300",
  fuchsia: "bg-fuchsia-400 dark:bg-fuchsia-300",
  pink: "bg-pink-400 dark:bg-pink-300",
  rose: "bg-rose-400 dark:bg-rose-300",
};

interface CategoryItemProps {
    color: string;
    label: string;
}

export function CategoryItem({ color, label }: CategoryItemProps) {
    return (
        <button className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 h-6">
            {/* propsで受け取った色を元に、colorMapから対応するクラスを適用 */}
            <div className={`h-3 w-3 rounded-full ${colorMap[color] || 'bg-neutral-400'}`}></div>
            <span>{label}</span>
        </button>
    );
}