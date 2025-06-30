"use client";

import React, { useMemo } from "react";

// 1. 型定義を修正
export type Segment = {
  start: string; // "hh:mm"
  end: string;   // "hh:mm"
  className: string; // Tailwindのクラス名を直接渡す
};

type DonutChartProps = {
  segments: Segment[];
  size?: number;
  innerRadius?: number;
  showTimeMarks?: boolean;
  showTimeLabels?: boolean;
  className?: string;
};

// "hh:mm" → 0〜24 の小数に変換
const parseTimeToFloat = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
};

export function DonutChart({
  segments,
  size = 400,
  innerRadius = 0.6,
  showTimeMarks = true,
  showTimeLabels = true,
  className = "",
}: DonutChartProps) {
  const center = 50;
  const outerRadius = 45;
  const innerRadiusValue = outerRadius * innerRadius;
  const labelRadius = innerRadiusValue * 0.9;

  const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const timeToAngle = (time: number) => (time / 24) * 360;

  const createDonutPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, outerRadius, endAngle);
    const end = polarToCartesian(center, center, outerRadius, startAngle);
    const innerStart = polarToCartesian(center, center, innerRadiusValue, endAngle);
    const innerEnd = polarToCartesian(center, center, innerRadiusValue, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadiusValue, innerRadiusValue, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const segmentPaths = useMemo(() => {
    return segments.map((segment, index) => {
      const startFloat = parseTimeToFloat(segment.start);
      // 24:00を24.0として扱えるように修正（これはバグ修正として含めます）
      const endFloat = segment.end === "24:00" ? 24 : parseTimeToFloat(segment.end);
      const startAngle = timeToAngle(startFloat);
      const endAngle = timeToAngle(endFloat);
      const path = createDonutPath(startAngle, endAngle);
      return {
        key: `segment-${index}`,
        path,
        // 3. propsからclassNameを直接受け取るように修正
        className: segment.className,
      };
    });
  }, [segments, innerRadius]); // 依存配列を元の状態に戻しました

  // ▼▼▼ ここから下のロジックは、お客様の元のコードを維持しています ▼▼▼

  const timeMarks = useMemo(() => {
    if (!showTimeMarks) return [];
    return Array.from({ length: 48 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const minute = (i % 2) * 30;
      const angle = timeToAngle(hour + minute / 60);
      const isHour = minute === 0;
      const len = isHour ? 1.5 : 1;
      const outer = polarToCartesian(center, center, innerRadiusValue, angle);
      const inner = polarToCartesian(center, center, innerRadiusValue + len, angle);
      return {
        key: `mark-${i}`,
        x1: outer.x,
        y1: outer.y,
        x2: inner.x,
        y2: inner.y,
        stroke: isHour ? "#ffffff" : "#eeeeee",
      };
    });
  }, [showTimeMarks, innerRadius]); // 依存配列を元の状態に戻しました

  const timeLabels = useMemo(() => {
    if (!showTimeLabels) return [];
    return Array.from({ length: 24 }, (_, h) => {
      const angle = timeToAngle(h);
      const point = polarToCartesian(center, center, labelRadius, angle);
      return {
        key: `label-${h}`,
        x: point.x,
        y: point.y,
        text: `${h.toString().padStart(2, "0")}:00`,
      };
    });
  }, [showTimeLabels, labelRadius]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className}`}
      role="img"
      aria-label="24時間のドーナツチャート"
    >
      <circle cx={center} cy={center} r={outerRadius} className="fill-neutral-100 dark:fill-neutral-900" />

      {/* セグメント */}
      {segmentPaths.map((seg) => (
          <path
            key={seg.key}
            d={seg.path}
            // 3. fill="currentColor"を削除し、classNameで直接色を指定
            className={seg.className}
          />
        ))}

      <circle
        cx={center}
        cy={center}
        r={innerRadiusValue}
        className="fill-white dark:fill-black"
        strokeWidth="0.2"
      />

      {timeMarks.map((mark) => (
        <line
          key={mark.key}
          x1={mark.x1}
          y1={mark.y1}
          x2={mark.x2}
          y2={mark.y2}
          stroke={mark.stroke}
          strokeWidth="0.1"
        />
      ))}

      {timeLabels.map((label) => (
        <text
          key={label.key}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-gray-600 dark:fill-gray-300"
          style={{ fontSize: "2px" }}
        >
          {label.text}
        </text>
      ))}
    </svg>
  );
}