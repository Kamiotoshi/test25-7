
import type { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonWithLoadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  spinnerSize?: number;
  spinnerColor?: string;
  children: ReactNode;
}

export default function ButtonWithLoading({
  loading = false,
  disabled = false,
  children,
  spinnerSize = 18,
  spinnerColor = "#fff",
  ...props
}: ButtonWithLoadingProps) {
  return (
    <button
      disabled={loading || disabled}
      {...props}
      style={{ position: "relative", ...props.style }}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoadingSpinner size={spinnerSize} color={spinnerColor} />
        </span>
      ) : (
        <span style={{ verticalAlign: "middle" }}>{children}</span>
      )}
    </button>
  );
} 