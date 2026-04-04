import StarRating from "./StarRating";
import { useShop } from "../shop/ShopContext";

export default function PlatformReviewBar({
  language,
}: {
  language: "en" | "hi";
}) {
  const { platformRating, setPlatformRating } = useShop();

  const label =
    language === "en" ? "Platform review" : "प्लेटफ़ॉर्म रिव्यू";
  const hint =
    language === "en"
      ? "Tap stars to rate"
      : "रेट करने के लिए स्टार चुनें";

  // Static count for UX (can be wired to backend later).
  const reviewCountLabel = language === "en" ? "reviews" : "रिव्यू";
  const reviewCount = 1248;

  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 border border-border">
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="text-[11px] text-muted-foreground">
          {platformRating}/5 · {reviewCount.toLocaleString()} {reviewCountLabel} · {hint}
        </span>
      </div>
      <div className="ml-1">
        <StarRating
          value={platformRating}
          onChange={(r) => setPlatformRating(r)}
          size="sm"
          label={label}
          iconColor="var(--color-accent)"
        />
      </div>
    </div>
  );
}

