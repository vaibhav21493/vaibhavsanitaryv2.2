import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Keeps navigation feeling snappy/clean by resetting scroll on route changes.
 * Respects browser back/forward scroll restoration by only running on pathname/search changes.
 */
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
}

