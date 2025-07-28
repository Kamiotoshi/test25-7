

export default function LoadingSpinner({ size = 24, color = "#ffa21a", style = {} }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `3px solid ${color}33`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        ...style
      }}
    />
  );
}

// CSS animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet); 