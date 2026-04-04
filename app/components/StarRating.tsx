import { Star } from "lucide-react";
import type { MouseEvent } from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function StarRating({
  value,
  onChange,
  size = "sm",
  readOnly = false,
  label,
  className,
  stopLinkNavigation = false,
}: {
  value: number;
  onChange?: (next: number) => void;
  size?: "sm" | "md";
  readOnly?: boolean;
  label?: string;
  className?: string;
  /**
   * Useful when the rating UI is rendered inside a Link-wrapped card.
   */
  stopLinkNavigation?: boolean;
}) {
  const starSize = size === "md" ? "size-5" : "size-4";
  const current = Math.max(0, Math.min(5, Math.round(value)));

  const handleClick = (e: MouseEvent, next: number) => {
    if (stopLinkNavigation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (readOnly) return;
    onChange?.(next);
  };

  return (
    <div className={cx("inline-flex items-center gap-1", className)} aria-label={label}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const starNumber = idx + 1;
        const filled = starNumber <= current;

        return (
          <button
            key={starNumber}
            type="button"
            className={cx(
              "rounded-sm transition-colors",
              readOnly ? "cursor-default" : "cursor-pointer hover:text-[#1C4D8D]",
              !readOnly && "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4988C4] focus-visible:ring-offset-2",
            )}
            onClick={(e) => handleClick(e, starNumber)}
            aria-label={`Rate ${starNumber} out of 5`}
            aria-pressed={filled}
            disabled={readOnly}
          >
            <Star className={cx(starSize, filled && "text-[#F59E0B]")} fill={filled ? "currentColor" : "none"} />
          </button>
        );
      })}
    </div>
  );
}

