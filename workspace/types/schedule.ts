export interface Schedule {
  id: number;
  title: string;
  start: string; // "HH:mm"
  end: string;   // "HH:mm"
  color: string; // "red", "blue", etc.
}

// colorMapのキーと一致させるための型
// components/layouts/ToDay/CategoryPanel/CategoryItem.tsx との整合性を保つ
export const availableColors = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", 
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"
] as const;

export type ScheduleColor = typeof availableColors[number];