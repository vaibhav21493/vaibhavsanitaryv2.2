import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getNavNode } from "../nav/navTree";
import { useShop } from "../shop/ShopContext";
import { useAuth } from "../auth/AuthProvider";

function getProductMeta(productId: string) {
  const node = getNavNode(productId);
  if (!node) return { title: productId, description: "", image: undefined as string | undefined };
  return { title: node.title, description: node.description ?? "", image: node.image };
}

export default function CartPage() {
  const { user } = useAuth();
  const {
    cart,
    cartCount,
    addToCart,
    decrementCart,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistCount,
    toggleWishlist,
  } = useShop();

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
      .map(([productId, qty]) => {
        const meta = getProductMeta(productId);
        return `${meta.title} x${qty}`;
      })
      .join("\n");

    const message = `Hi Vaibhav Sanitary, I want to inquire about:\n${itemsText}`;
    const url = `https://wa.me/919667866899?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const requestOnWebsite = () => {
    if (!user) {
      window.location.href = "/login?from=/request";
      return;
    }
    window.location.href = "/request";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BDE8F5] to-white">
      <div className="container mx-auto px-4 py-10 vs-route-enter">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="size-4 mr-2" />
              Back to store
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0F2854]">Cart {cartCount ? `(${cartCount})` : ""}</CardTitle>
                <CardDescription>Items you’ve added to your cart.</CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty.</p>
                ) : (
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                      {cartItems.map(([productId, qty]) => {
                        const meta = getProductMeta(productId);
                        return (
                          <div key={productId} className="rounded-xl border bg-white p-4">
                            <div className="flex gap-4">
                              <div className="h-20 w-28 overflow-hidden rounded-md bg-muted flex-shrink-0">
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
                                <div className="font-semibold text-[#0F2854]">{meta.title}</div>
                                {meta.description && (
                                  <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                    {meta.description}
                                  </div>
                                )}
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={() => decrementCart(productId)}>
                                    -
                                  </Button>
                                  <Badge variant="secondary">{qty}</Badge>
                                  <Button variant="outline" size="sm" onClick={() => addToCart(productId, 1)}>
                                    +
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(productId)}>
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            {recommendedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0F2854]">Recommended for you</CardTitle>
                  <CardDescription>Based on items in your cart.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {recommendedItems.map((productId) => {
                      const meta = getProductMeta(productId);
                      return (
                        <div key={productId} className="rounded-xl border bg-white p-4">
                          <div className="flex gap-3">
                            <div className="h-16 w-20 overflow-hidden rounded-md bg-muted flex-shrink-0">
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
                              <div className="font-medium text-[#0F2854] truncate">{meta.title}</div>
                              <Button size="sm" className="mt-2" onClick={() => addToCart(productId, 1)}>
                                Add to cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wishlist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0F2854]">Wishlist {wishlistCount ? `(${wishlistCount})` : ""}</CardTitle>
                <CardDescription>Items you’ve saved for later.</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <p className="text-muted-foreground">Your wishlist is empty.</p>
                ) : (
                  <ScrollArea className="h-[40vh] pr-4">
                    <div className="space-y-3">
                      {wishlistItems.map((productId) => {
                        const meta = getProductMeta(productId);
                        return (
                          <div key={productId} className="rounded-xl border bg-white p-3">
                            <div className="flex gap-3">
                              <div className="h-12 w-16 overflow-hidden rounded-md bg-muted flex-shrink-0">
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
                                <div className="font-medium text-[#0F2854] truncate">{meta.title}</div>
                                <div className="mt-2 flex gap-2">
                                  <Button size="sm" onClick={() => addToCart(productId, 1)}>
                                    Add to cart
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => toggleWishlist(productId)}>
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            {cartItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0F2854]">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear cart
                  </Button>
                  <div className="grid gap-2">
                    <Button variant="outline" className="w-full" onClick={requestViaWhatsapp}>
                      Request via WhatsApp
                    </Button>
                    <Button className="w-full" onClick={requestOnWebsite}>
                      Request on Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
