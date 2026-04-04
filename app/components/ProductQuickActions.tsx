import { Heart, ShoppingCart } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";

import { useShop } from "../shop/ShopContext";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function IconButton({
  label,
  onClick,
  children,
  active = false,
  stopLinkNavigation = false,
}: {
  label: string;
  onClick: (e: MouseEvent) => void;
  children: ReactNode;
  active?: boolean;
  stopLinkNavigation?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        "inline-flex size-9 items-center justify-center rounded-full border bg-white/90 shadow-sm backdrop-blur transition-all",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4988C4] focus-visible:ring-offset-2",
        active && "border-[#4988C4]",
      )}
      onClick={(e) => {
        if (stopLinkNavigation) {
          e.preventDefault();
          e.stopPropagation();
        }
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

export default function ProductQuickActions({
  productId,
  stopLinkNavigation = false,
  className,
}: {
  productId: string;
  stopLinkNavigation?: boolean;
  className?: string;
}) {
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const isWishlisted = wishlist.has(productId);

  return (
    <div className={cx("flex items-center gap-2", className)}>
      <IconButton
        label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        active={isWishlisted}
        stopLinkNavigation={stopLinkNavigation}
        onClick={() => toggleWishlist(productId)}
      >
        <Heart className="size-4 text-[#0F2854]" fill={isWishlisted ? "currentColor" : "none"} />
      </IconButton>

      <IconButton
        label="Add to cart"
        stopLinkNavigation={stopLinkNavigation}
        onClick={() => addToCart(productId, 1)}
      >
        <ShoppingCart className="size-4 text-[#0F2854]" />
      </IconButton>
    </div>
  );
}

