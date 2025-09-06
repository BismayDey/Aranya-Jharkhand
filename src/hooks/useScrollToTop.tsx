import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Ensures every route change starts at the top instantly (no footer flash)
export const useScrollToTop = () => {
  const location = useLocation();

  // Disable the browser's automatic scroll restoration to prevent jumping to old positions
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  // Use layout effect so it runs before the first paint of the new page
  useLayoutEffect(() => {
    // Instant jump to top avoids showing previous scroll position or footer
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default useScrollToTop;
