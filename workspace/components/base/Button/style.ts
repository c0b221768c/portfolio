import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyle = tv({
  slots: {
    button: `
      inline-flex items-center justify-center relative font-medium gap-x-1.5
      transition-all duration-200 ease-in-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      active:transform active:scale-[0.98]
    `,
    label: "truncate",
    icon: "flex-shrink-0 inline-flex items-center justify-center",
    spinner: "absolute inset-0 flex items-center justify-center",
  },

  variants: {
    color: {
      primary: { 
        button: "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400" 
      },
      danger: { 
        button: "focus-visible:ring-red-500 dark:focus-visible:ring-red-400" 
      },
      success: { 
        button: "focus-visible:ring-green-500 dark:focus-visible:ring-green-400" 
      },
      neutral: { 
        button: "focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400" 
      },
    },

    variant: {
      filled: {},
      outlined: { 
        button: "border-2 bg-transparent hover:border-opacity-80" 
      },
      text: { 
        button: "bg-transparent border-transparent hover:bg-opacity-10" 
      },
      ghost: { 
        button: "bg-transparent border-transparent shadow-none hover:bg-opacity-5" 
      },
    },

    shape: {
      rounded: { button: "rounded-lg" },
      pill: { button: "rounded-full" },
      circle: { button: "rounded-full aspect-square" },
      square: { button: "rounded-none" },
    },

    size: {
      xs: {
        button: "px-2 py-1 text-xs min-h-[24px]",
        label: "text-xs",
        icon: "h-3 w-3",
      },
      sm: {
        button: "px-3 py-1.5 text-sm min-h-[32px]",
        label: "text-sm",
        icon: "h-4 w-4",
      },
      md: { 
        button: "px-4 py-2 text-sm min-h-[40px]", 
        label: "text-sm", 
        icon: "h-5 w-5" 
      },
      lg: {
        button: "px-6 py-3 text-base min-h-[48px]",
        label: "text-base",
        icon: "h-6 w-6",
      },
      xl: {
        button: "px-8 py-4 text-lg min-h-[56px]",
        label: "text-lg",
        icon: "h-7 w-7",
      },
    },

    isIconOnly: { 
      true: { 
        label: "sr-only",
        button: "aspect-square justify-center"
      } 
    },

    loading: { 
      true: { 
        button: "cursor-wait relative",
        icon: "opacity-0",
        label: "opacity-0"
      } 
    },

    fullWidth: { 
      true: { button: "w-full" } 
    },

    disabled: {
      true: {
        button: "opacity-50 cursor-not-allowed pointer-events-none"
      }
    }
  },

  compoundVariants: [
    // Primary variants
    {
      color: "primary",
      variant: "filled",
      class: {
        button: `
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
          text-white shadow-sm hover:shadow-md
          dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700
        `,
      },
    },
    {
      color: "primary",
      variant: "outlined",
      class: {
        button: `
          border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100
          dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500/10
          dark:active:bg-blue-500/20
        `,
      },
    },
    {
      color: "primary",
      variant: "text",
      class: {
        button: `
          text-blue-600 hover:bg-blue-50 active:bg-blue-100
          dark:text-blue-400 dark:hover:bg-blue-500/10 dark:active:bg-blue-500/20
        `,
      },
    },
    {
      color: "primary",
      variant: "ghost",
      class: {
        button: `
          text-blue-600 hover:bg-blue-100/60 active:bg-blue-100
          dark:text-blue-400 dark:hover:bg-blue-400/10 dark:active:bg-blue-400/20
        `,
      },
    },

    // Danger variants
    {
      color: "danger",
      variant: "filled",
      class: {
        button: `
          bg-red-600 hover:bg-red-700 active:bg-red-800 
          text-white shadow-sm hover:shadow-md
          dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700
        `,
      },
    },
    {
      color: "danger",
      variant: "outlined",
      class: {
        button: `
          border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100
          dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500/10
          dark:active:bg-red-500/20
        `,
      },
    },
    {
      color: "danger",
      variant: "text",
      class: {
        button: `
          text-red-600 hover:bg-red-50 active:bg-red-100
          dark:text-red-400 dark:hover:bg-red-500/10 dark:active:bg-red-500/20
        `,
      },
    },
    {
      color: "danger",
      variant: "ghost",
      class: {
        button: `
          text-red-600 hover:bg-red-100/60 active:bg-red-100
          dark:text-red-400 dark:hover:bg-red-400/10 dark:active:bg-red-400/20
        `,
      },
    },

    // Success variants
    {
      color: "success",
      variant: "filled",
      class: {
        button: `
          bg-green-600 hover:bg-green-700 active:bg-green-800 
          text-white shadow-sm hover:shadow-md
          dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700
        `,
      },
    },
    {
      color: "success",
      variant: "outlined",
      class: {
        button: `
          border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100
          dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/10
          dark:active:bg-green-500/20
        `,
      },
    },
    {
      color: "success",
      variant: "text",
      class: {
        button: `
          text-green-600 hover:bg-green-50 active:bg-green-100
          dark:text-green-400 dark:hover:bg-green-500/10 dark:active:bg-green-500/20
        `,
      },
    },
    {
      color: "success",
      variant: "ghost",
      class: {
        button: `
          text-green-600 hover:bg-green-100/60 active:bg-green-100
          dark:text-green-400 dark:hover:bg-green-400/10 dark:active:bg-green-400/20
        `,
      },
    },

    // Neutral variants
    {
      color: "neutral",
      variant: "filled",
      class: {
        button: `
          bg-neutral-700 hover:bg-neutral-800 active:bg-neutral-900 
          text-white shadow-sm hover:shadow-md
          dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:active:bg-neutral-800
        `,
      },
    },
    {
      color: "neutral",
      variant: "outlined",
      class: {
        button: `
          border-neutral-600 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100
          dark:border-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-500/10
          dark:active:bg-neutral-500/20
        `,
      },
    },
    {
      color: "neutral",
      variant: "text",
      class: {
        button: `
          text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100
          dark:text-neutral-300 dark:hover:bg-neutral-500/10 dark:active:bg-neutral-500/20
        `,
      },
    },
    {
      color: "neutral",
      variant: "ghost",
      class: {
        button: `
          text-neutral-700 hover:bg-neutral-200/60 active:bg-neutral-200
          dark:text-neutral-300 dark:hover:bg-neutral-700/60 dark:active:bg-neutral-700
        `,
      },
    },

    // Icon-only size adjustments
    {
      isIconOnly: true,
      size: "xs",
      class: { button: "p-1", icon: "h-3 w-3" },
    },
    {
      isIconOnly: true,
      size: "sm",
      class: { button: "p-1.5", icon: "h-4 w-4" },
    },
    {
      isIconOnly: true,
      size: "md",
      class: { button: "p-2", icon: "h-5 w-5" },
    },
    {
      isIconOnly: true,
      size: "lg",
      class: { button: "p-3", icon: "h-6 w-6" },
    },
    {
      isIconOnly: true,
      size: "xl",
      class: { button: "p-4", icon: "h-7 w-7" },
    },

    // Loading state adjustments
    {
      loading: true,
      variant: "filled",
      class: {
        spinner: "text-white dark:text-white"
      }
    },
    {
      loading: true,
      variant: ["outlined", "text", "ghost"],
      color: "primary",
      class: {
        spinner: "text-blue-600 dark:text-blue-400"
      }
    },
    {
      loading: true,
      variant: ["outlined", "text", "ghost"],
      color: "danger",
      class: {
        spinner: "text-red-600 dark:text-red-400"
      }
    },
    {
      loading: true,
      variant: ["outlined", "text", "ghost"],
      color: "success",
      class: {
        spinner: "text-green-600 dark:text-green-400"
      }
    },
    {
      loading: true,
      variant: ["outlined", "text", "ghost"],
      color: "neutral",
      class: {
        spinner: "text-neutral-700 dark:text-neutral-300"
      }
    },
  ],

  defaultVariants: {
    color: "primary",
    variant: "filled",
    shape: "rounded",
    size: "md",
    isIconOnly: false,
    loading: false,
    fullWidth: false,
    disabled: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonStyle> & {
  /**
   * ボタンのカラーテーマを指定します。
   * - `"primary"`: 青を基調とした主ボタン
   * - `"danger"`: 赤を基調とした警告ボタン
   * - `"success"`: 緑を基調とした成功ボタン
   * - `"neutral"`: グレー基調の中立ボタン
   * 
   * @default "primary"
   */
  color?: "primary" | "danger" | "success" | "neutral";

  /**
   * ボタンのスタイルバリエーションを指定します。
   * - `"filled"`: 背景色あり（主に使用）
   * - `"outlined"`: 枠線のみのスタイル
   * - `"text"`: 枠線・背景なし、テキストのみに見えるボタン
   * - `"ghost"`: ほぼ透明でホバー時に薄く変化
   * 
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "text" | "ghost";

  /**
   * ボタンの形状を指定します。
   * - `"rounded"`: 標準の角丸
   * - `"pill"`: 丸みの強いカプセル型  
   * - `"circle"`: 正円
   * - `"square"`: 角丸なし
   * 
   * @default "rounded"
   */
  shape?: "rounded" | "pill" | "circle" | "square";

  /**
   * ボタンのサイズを指定します。
   * - `"xs"`: 極小サイズ
   * - `"sm"`: 小サイズ
   * - `"md"`: 中サイズ
   * - `"lg"`: 大サイズ
   * - `"xl"`: 特大サイズ
   * 
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * アイコンのみを表示するボタンとして扱う場合に true を指定します。
   * テキストは `sr-only` で非表示になり、正方形スタイルが適用されます。
   * 
   * @default false
   */
  isIconOnly?: boolean;

  /**
   * ローディング状態にする場合に true を指定します。
   * スピナーが表示され、ボタンは `cursor-wait` かつ無効化されます。
   * 
   * @default false
   */
  loading?: boolean;

  /**
   * 親要素いっぱいに幅を広げたいときに指定します。
   * 
   * @default false
   */
  fullWidth?: boolean;

  /**
   * ボタンを無効化する場合に true を指定します。
   * 
   * @default false
   */
  disabled?: boolean;
};