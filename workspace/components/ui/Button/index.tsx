"use client";
import * as React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import { buttonStyle, type ButtonVariantProps } from "./style";
import { cn } from "@/lib/utils/cn";

// デフォルトスピナーアイコン
const DefaultSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export type ButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "disabled"> &
  ButtonVariantProps & {
    /**
     * ボタンの左側に表示するアイコン
     */
    leftIcon?: React.ReactNode;
    
    /**
     * ボタンの右側に表示するアイコン
     */
    rightIcon?: React.ReactNode;
    
    /**
     * アイコンオンリーボタンまたはローディング状態で表示するアイコン
     */
    icon?: React.ReactNode;
    
    /**
     * カスタムスピナーアイコン（未指定時はデフォルトスピナーを使用）
     */
    spinner?: React.ReactNode;
    
    /**
     * ローディング中に表示するテキスト（アクセシビリティ用）
     */
    loadingText?: string;
  };

/**
 * 高機能で使いやすいButtonコンポーネント
 * 
 * @example
 * ```tsx
 * // 基本的な使用
 * <Button>Click me</Button>
 * 
 * // バリエーション
 * <Button color="danger" variant="outlined">Delete</Button>
 * 
 * // アイコン付き
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 * 
 * // ローディング状態
 * <Button loading icon={<Spinner />}>Saving...</Button>
 * 
 * // アイコンオンリー
 * <Button isIconOnly icon={<SearchIcon />} aria-label="Search" />
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color,
      variant,
      shape,
      size,
      isIconOnly,
      loading,
      fullWidth,
      disabled,
      className,
      leftIcon,
      rightIcon,
      icon,
      spinner,
      loadingText,
      children,
      type = "button",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    // 開発環境でのバリデーション
    React.useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        // アイコンオンリーボタンのアクセシビリティチェック
        if (isIconOnly && !ariaLabel && !ariaLabelledBy && !children) {
          console.warn(
            "[Button] Icon-only buttons should have an accessible name via `aria-label`, `aria-labelledby`, or `children` props for screen readers."
          );
        }
        
        // ローディング状態でのアイコンチェック
        if (loading && !icon && !spinner) {
          console.warn(
            "[Button] Loading buttons should have a spinner. Consider providing `icon` or `spinner` prop."
          );
        }
        
        // 矛盾する設定のチェック
        if (isIconOnly && (leftIcon || rightIcon)) {
          console.warn(
            "[Button] `leftIcon` and `rightIcon` are ignored when `isIconOnly={true}`. Use `icon` prop instead."
          );
        }
      }
    }, [isIconOnly, loading, icon, spinner, ariaLabel, ariaLabelledBy, children, leftIcon, rightIcon]);

    // スタイル計算（メモ化）
    const styles = React.useMemo(
      () =>
        buttonStyle({
          color,
          variant,
          shape,
          size,
          isIconOnly,
          loading,
          fullWidth,
          disabled: disabled || loading,
        }),
      [color, variant, shape, size, isIconOnly, loading, fullWidth, disabled]
    );

    // アイコンレンダリング関数
    const renderIcon = React.useCallback(
      (iconContent: React.ReactNode, iconClassName: string) =>
        iconContent ? (
          <span className={iconClassName} aria-hidden="true">
            {iconContent}
          </span>
        ) : null,
      []
    );

    // スピナーの決定
    const spinnerIcon = spinner || <DefaultSpinner />;

    // コンテンツの構築
    const content = React.useMemo(() => {
      const iconCls = styles.icon();
      const labelCls = styles.label();
      const spinnerCls = styles.spinner();

      if (loading) {
        return (
          <>
            <span className={spinnerCls} aria-hidden="true">
              {renderIcon(spinnerIcon, iconCls)}
            </span>
            {/* ローディング中でも元のコンテンツは残す（透明化される） */}
            {isIconOnly ? (
              renderIcon(icon, iconCls) || <span className={labelCls}>{children}</span>
            ) : (
              <>
                {renderIcon(leftIcon, iconCls)}
                {children && <span className={labelCls}>{children}</span>}
                {renderIcon(rightIcon, iconCls)}
              </>
            )}
          </>
        );
      }

      if (isIconOnly) {
        return renderIcon(icon, iconCls) || <span className={labelCls}>{children}</span>;
      }

      return (
        <>
          {renderIcon(leftIcon, iconCls)}
          {children && <span className={labelCls}>{children}</span>}
          {renderIcon(rightIcon, iconCls)}
        </>
      );
    }, [
      styles,
      loading,
      isIconOnly,
      icon,
      leftIcon,
      rightIcon,
      children,
      spinnerIcon,
      renderIcon,
    ]);

    // アクセシビリティ属性の構築
    const accessibilityProps = React.useMemo(() => {
      const props: React.AriaAttributes = {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
      };

      if (loading) {
        props["aria-busy"] = true;
        if (loadingText) {
          props["aria-label"] = loadingText;
        }
      }

      return props;
    }, [ariaLabel, ariaLabelledBy, ariaDescribedBy, loading, loadingText]);

    return (
      <HeadlessButton
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(styles.button(), className)}
        {...accessibilityProps}
        {...rest}
      >
        {content}
      </HeadlessButton>
    );
  },
);

Button.displayName = "Button";