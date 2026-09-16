import { Heart, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { getNavNode } from "../nav/navTree";
import { useShop } from "../shop/ShopContext";
import { useAuth } from "../auth/AuthProvider";

function getProductMeta(productId: string) {
  const node = getNavNode(productId);
  if (!node) return { title: productId, description: "", image: undefined as string | undefined };
  return { title: node.title, description: node.description ?? "", image: node.image };
}

export default function CartWishlistSheet() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    wishlist,
    cartCount,
    wishlistCount,
    addToCart,
    decrementCart,
    removeFromCart,
    clearCart,
    toggleWishlist,
  } = useShop();

  const [tab, setTab] = useState<"cart" | "wishlist">("cart");

  const cartItems = useMemo(() => Object.entries(cart).filter(([, qty]) => qty > 0), [cart]);
  const wishlistItems = useMemo(() => Array.from(wishlist), [wishlist]);

  const recommendedItems = useMemo(() => {
    const inCart = new Set(cartItems.map(([productId]) => productId));
    const recSet = new Set<string>();

    for (const [productId] of cartItems) {
      const node = getNavNode(productId);
      const parentId = node?.parentId;
      if (!parentId) continue;
      const parent = getNavNode(parentId);
      if (!parent) continue;

      for (const siblingId of parent.children) {
        if (siblingId === productId) continue;
        if (inCart.has(siblingId)) continue;
        recSet.add(siblingId);
        if (recSet.size >= 8) break;
      }

      if (recSet.size >= 8) break;
    }

    return Array.from(recSet);
  }, [cartItems]);

  const requestViaWhatsapp = () => {
    const itemsText = cartItems
      .map(([productId, qty], idx) => {
        const meta = getProductMeta(productId);
        return `${idx + 1}. ${meta.title} (Qty: ${qty})`;
      })
      .join("\n");

    const message = `Hello Vaibhav Sanitary,\nI want to inquire about availability and pricing for:\n\n${itemsText}`;
    const url = `https://wa.me/916377307050?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const requestOnWebsite = () => {
    if (!user) {
      navigate("/login", { state: { from: "/request" } });
      return;
    }

    navigate("/request");
  };

  return (
    <Sheet>
      <div className="flex items-center gap-2">
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border"
            onClick={() => setTab("wishlist")}
          >
            <Heart className="size-4" />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 ? (
              <Badge className="ml-1 bg-accent text-accent-foreground border-border">
                {wishlistCount}
              </Badge>
            ) : null}
          </Button>
        </SheetTrigger>

        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border"
            onClick={() => setTab("cart")}
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <Badge className="ml-1 bg-accent text-accent-foreground border-border">
                {cartCount}
              </Badge>
            ) : null}
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart & Wishlist</SheetTitle>
          <SheetDescription>
            Manage items you liked, wishlisted, and added to cart.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "cart" | "wishlist")}>
            <TabsList className="w-full">
              <TabsTrigger value="cart" className="w-full">
                Cart {cartCount ? `(${cartCount})` : ""}
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="w-full">
                Wishlist {wishlistCount ? `(${wishlistCount})` : ""}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="mt-3">
              <ScrollArea className="h-[55vh] pr-2">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map(([productId, qty]) => {
                      const meta = getProductMeta(productId);
                      return (
                        <div key={productId} className="rounded-xl border bg-white p-3">
                          <div className="flex gap-3">
                            <div className="h-14 w-20 overflow-hidden rounded-md bg-muted">
                              {meta.image ? (
                                <ImageWithFallback
                                  src={meta.image}
                                  alt={meta.title}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-semibold text-[#0F2854]">
                                {meta.title}
                              </div>
                              {meta.description ? (
                                <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                  {meta.description}
                                </div>
                              ) : null}
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => decrementCart(productId)}
                                >
                                  -
                                </Button>
                                <Badge variant="secondary">{qty}</Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addToCart(productId, 1)}
                                >
                                  +
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(productId)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {recommendedItems.length > 0 ? (
                  <>
                    <Separator className="my-5" />

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#0F2854]">
                          Recommended for you
                        </h3>
                        <Badge variant="secondary">{recommendedItems.length}</Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-3">
                        {recommendedItems.map((productId) => {
                          const meta = getProductMeta(productId);
                          return (
                            <div key={productId} className="rounded-xl border bg-white p-3">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                                  {meta.image ? (
                                    <ImageWithFallback
                                      src={meta.image}
                                      alt={meta.title}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                  ) : null}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="truncate font-medium text-[#0F2854]">
                                    {meta.title}
                                  </div>
                                </div>
                                <Button size="sm" onClick={() => addToCart(productId, 1)}>
                                  Add to cart
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}
              </ScrollArea>

              {cartItems.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/cart")}>
                    View full cart
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear cart
                  </Button>
                </div>
              ) : null}

              {cartItems.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Button variant="outline" className="w-full" onClick={requestViaWhatsapp}>
                    Request via WhatsApp
                  </Button>
                  <Button className="w-full" onClick={requestOnWebsite}>
                    Request on Website
                  </Button>
                </div>
              ) : null}
            </TabsContent>

            <TabsContent value="wishlist" className="mt-3">
              <ScrollArea className="h-[55vh] pr-2">
                {wishlistItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Your wishlist is empty.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {wishlistItems.map((productId) => {
                      const meta = getProductMeta(productId);
                      return (
                        <div key={productId} className="rounded-xl border bg-white p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                              {meta.image ? (
                                <ImageWithFallback
                                  src={meta.image}
                                  alt={meta.title}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-semibold text-[#0F2854]">
                                {meta.title}
                              </div>
                              {meta.description ? (
                                <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                  {meta.description}
                                </div>
                              ) : null}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" onClick={() => addToCart(productId, 1)}>
                                Add to cart
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleWishlist(productId)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

