

interface LoadingBarProps {
  isLoading: boolean;
  color?: string;
  height?: number;
}

export default function LoadingBar({ isLoading, color = "#ffa21a", height = 3 }: LoadingBarProps) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: isLoading ? "100%" : 0,
      height,
      background: color,
      zIndex: 9999,
      boxShadow: isLoading ? `0 1px 8px ${color}55` : undefined,
      opacity: isLoading ? 1 : 0,
      transition: "width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s",
      pointerEvents: "none",
      animation: isLoading ? "loading-bar-move 1.2s linear infinite" : undefined
    }} />
  );
}

// CSS animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes loading-bar-move {
  0% { left: -40%; width: 40%; }
  50% { left: 20%; width: 60%; }
  100% { left: 100%; width: 80%; }
}`;
document.head.appendChild(styleSheet); 