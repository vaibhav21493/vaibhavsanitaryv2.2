import StarRating from "./StarRating";
import { useShop } from "../shop/ShopContext";

export default function PlatformReviewBar({
  language,
}: {
  language: "en" | "hi";
}) {
  const { platformRating, setPlatformRating } = useShop();

  const label = language === "en" ? "Rate your experience" : "अपना अनुभव रेट करें";
  const reviewCount = 1248;
  const reviewCountLabel = language === "en"
    ? `${reviewCount.toLocaleString()} reviews`
    : `${reviewCount.toLocaleString()} रिव्यू`;

  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold text-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground">
          {platformRating > 0 ? `${platformRating}/5 · ` : ""}{reviewCountLabel}
        </span>
      </div>
      <StarRating
        value={platformRating}
        onChange={(r) => setPlatformRating(r)}
        size="sm"
        label={label}
        iconColor="var(--brand-orange, #E8891A)"
      />
    </div>
  );
}
