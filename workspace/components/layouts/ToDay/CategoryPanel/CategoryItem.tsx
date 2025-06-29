// CategoryItem.tsx

// JSONのキー（色の名前）とTailwind CSSのクラスを対応させるためのオブジェクト
const colorMap: { [key: string]: string } = {
  red: "bg-red-400",
  orange: "bg-orange-400",
  amber: "bg-amber-400",
  yellow: "bg-yellow-400",
  lime: "bg-lime-400",
  green: "bg-green-400",
  emerald: "bg-emerald-400",
  teal: "bg-teal-400",
  cyan: "bg-cyan-400",
  sky: "bg-sky-400",
  blue: "bg-blue-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  fuchsia: "bg-fuchsia-400",
  pink: "bg-pink-400",
  rose: "bg-rose-400",
};

interface CategoryItemProps {
    color: string;
    label: string;
}

export function CategoryItem({ color, label }: CategoryItemProps) {
    return (
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200 h-6">
            {/* propsで受け取った色を元に、colorMapから対応するクラスを適用 */}
            <div className={`h-3 w-3 rounded-full ${colorMap[color] || 'bg-gray-400'}`}></div>
            <span>{label}</span>
        </button>
    );
}