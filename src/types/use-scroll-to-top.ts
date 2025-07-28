import { useEffect } from "react";

/**
 * Scroll lên đầu trang (hoặc tới header) khi component mount hoặc khi pathname thay đổi.
 * Nếu dùng react-router, truyền pathname vào để tự động scroll khi chuyển route.
 * @param deps - dependencies, ví dụ: [pathname] nếu dùng react-router
 */
export default function useScrollToTop(deps: any[] = []) {
  useEffect(() => {
    // Scroll lên đầu trang (có thể chỉnh selector nếu muốn scroll tới header)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, deps);
} 