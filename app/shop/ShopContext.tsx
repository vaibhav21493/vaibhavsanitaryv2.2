import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type PersistedShopState = {
  cart: Record<string, number>;
  wishlist: string[];
  liked: string[];
  ratings: Record<string, number>;
  platformRating: number;
};

type ShopContextValue = {
  cart: Record<string, number>;
  wishlist: Set<string>;
  liked: Set<string>;
  ratings: Record<string, number>;
  platformRating: number;

  cartCount: number;
  wishlistCount: number;
  likedCount: number;

  addToCart: (productId: string, qty?: number) => void;
  decrementCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => void;
  toggleLike: (productId: string) => void;

  getRating: (productId: string) => number;
  getCartQuantity: (productId: string) => number;
  setRating: (productId: string, rating: number) => void;

  setPlatformRating: (rating: number) => void;
};

const STORAGE_KEY = "vaibhavsanitary.shop.v1";

const ShopContext = createContext<ShopContextValue | null>(null);

function clampRating(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(5, Math.round(value)));
}

function safeParseState(raw: string | null): PersistedShopState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedShopState>;
    if (!parsed || typeof parsed !== "object") return null;

    return {
      cart: parsed.cart && typeof parsed.cart === "object" ? (parsed.cart as Record<string, number>) : {},
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist.filter((x) => typeof x === "string") : [],
      liked: Array.isArray(parsed.liked) ? parsed.liked.filter((x) => typeof x === "string") : [],
      ratings: parsed.ratings && typeof parsed.ratings === "object" ? (parsed.ratings as Record<string, number>) : {},
      platformRating: clampRating(typeof parsed.platformRating === "number" ? parsed.platformRating : 5),
    };
  } catch {
    return null;
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [platformRating, setPlatformRating] = useState<number>(5);

  // Load persisted state once.
  useEffect(() => {
    const persisted = safeParseState(localStorage.getItem(STORAGE_KEY));
    if (!persisted) return;

    setCart(() => persisted.cart ?? {});
    setWishlist(() => new Set(persisted.wishlist ?? []));
    setLiked(() => new Set(persisted.liked ?? []));
    setRatings(() => persisted.ratings ?? {});
    setPlatformRating(() => clampRating(persisted.platformRating ?? 5));
  }, []);

  // Persist on change.
  useEffect(() => {
    const state: PersistedShopState = {
      cart,
      wishlist: Array.from(wishlist),
      liked: Array.from(liked),
      ratings,
      platformRating: clampRating(platformRating),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [cart, wishlist, liked, ratings, platformRating]);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + (Number.isFinite(qty) ? qty : 0), 0),
    [cart],
  );
  const wishlistCount = wishlist.size;
  const likedCount = liked.size;

  const value: ShopContextValue = useMemo(
    () => ({
      cart,
      wishlist,
      liked,
      ratings,
      platformRating,

      cartCount,
      wishlistCount,
      likedCount,

      addToCart: (productId, qty = 1) => {
        const q = Math.max(1, Math.floor(qty));
        setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + q }));
      },
      decrementCart: (productId) => {
        setCart((prev) => {
          const nextQty = (prev[productId] ?? 0) - 1;
          if (nextQty <= 0) {
            const { [productId]: _removed, ...rest } = prev;
            return rest;
          }
          return { ...prev, [productId]: nextQty };
        });
      },
      removeFromCart: (productId) => {
        setCart((prev) => {
          const { [productId]: _removed, ...rest } = prev;
          return rest;
        });
      },
      clearCart: () => setCart({}),

      toggleWishlist: (productId) => {
        setWishlist((prev) => {
          const next = new Set(prev);
          if (next.has(productId)) next.delete(productId);
          else next.add(productId);
          return next;
        });
      },
      toggleLike: (productId) => {
        setLiked((prev) => {
          const next = new Set(prev);
          const willLike = !next.has(productId);
          if (willLike) {
            next.add(productId);
            setCart((prevCart) => {
              const currentQty = prevCart[productId] ?? 0;
              if (currentQty > 0) return prevCart;
              return { ...prevCart, [productId]: 1 };
            });
          } else {
            next.delete(productId);
          }
          return next;
        });
      },

      getRating: (productId) => clampRating(ratings[productId] ?? 0),
      getCartQuantity: (productId) => cart[productId] ?? 0,
      setRating: (productId, rating) => {
        const r = clampRating(rating);
        setRatings((prev) => ({ ...prev, [productId]: r }));
      },

      setPlatformRating: (rating) => setPlatformRating(clampRating(rating)),
    }),
    [cart, wishlist, liked, ratings, platformRating, cartCount, wishlistCount, likedCount],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

