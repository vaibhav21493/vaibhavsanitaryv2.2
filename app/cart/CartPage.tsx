import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, MessageCircle, Send, Trash2, ShoppingBag, ShieldCheck, Truck, Plus, Minus, Heart } from "lucide-react";

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
  const navigate = useNavigate();
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
      .map(([productId, qty], idx) => {
        const meta = getProductMeta(productId);
        return `${idx + 1}. ${meta.title} (Qty: ${qty})`;
      })
      .join("\n");

    const message = `Hello Vaibhav Sanitary,\nI would like to inquire about pricing, stock & delivery for the following items:\n\n${itemsText}\n\nPlease share the best quotation.`;
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
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-[#d0daea]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="outline" size="sm" asChild className="border-[#d0daea] text-xs h-8">
            <Link to="/">
              <ArrowLeft className="size-3.5 mr-1" />
              Back to Store
            </Link>
          </Button>
          <div className="text-xs font-semibold text-[#003B6F]">
            Vaibhav Sanitary · Official Inquiry Cart
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 vs-route-enter">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A]">
            Product Inquiry Cart
          </h1>
          <p className="text-sm text-[#5a6a82] mt-1">
            Review your selected building materials and request quotations directly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#d0daea] shadow-sm">
              <CardHeader className="border-b border-[#d0daea]/60 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-5 text-[#003B6F]" />
                    <CardTitle className="text-[#0D1B2A] text-lg font-bold">
                      Selected Items ({cartCount})
                    </CardTitle>
                  </div>
                  {cartItems.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700 h-8"
                    >
                      <Trash2 className="size-3.5 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#003B6F]/10 flex items-center justify-center mx-auto mb-4 text-[#003B6F]">
                      <ShoppingBag className="size-8" />
                    </div>
                    <h3 className="text-base font-bold text-[#0D1B2A]">Your inquiry cart is empty</h3>
                    <p className="text-sm text-[#5a6a82] mt-1 max-w-sm mx-auto">
                      Explore our bathware, plumbing, tiles, and electrical catalog to add items.
                    </p>
                    <Button asChild className="mt-5 bg-[#003B6F] hover:bg-[#00244A] text-white">
                      <Link to="/nav/root">Browse All Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(([productId, qty]) => {
                      const meta = getProductMeta(productId);
                      return (
                        <div
                          key={productId}
                          className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-[#d0daea] bg-white hover:border-[#003B6F]/40 transition"
                        >
                          <div className="h-20 w-24 sm:w-28 overflow-hidden rounded-lg bg-[#f8f9fb] flex-shrink-0 border border-[#d0daea]/60">
                            {meta.image ? (
                              <ImageWithFallback
                                src={meta.image}
                                alt={meta.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-[#5a6a82]">
                                Material
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-[#0D1B2A] text-sm">
                                {meta.title}
                              </div>
                              {meta.description && (
                                <div className="mt-1 text-xs text-[#5a6a82] line-clamp-2">
                                  {meta.description}
                                </div>
                              )}
                            </div>
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2 border border-[#d0daea] rounded-lg p-1 bg-[#f8f9fb]">
                                <button
                                  onClick={() => decrementCart(productId)}
                                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#0D1B2A] transition"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <span className="min-w-[2rem] text-center text-xs font-bold text-[#0D1B2A]">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => addToCart(productId, 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#0D1B2A] transition"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(productId)}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                              >
                                <Trash2 className="size-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            {recommendedItems.length > 0 && (
              <Card className="border-[#d0daea] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0D1B2A] text-base font-bold">
                    Frequently Inquired Together
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Complementary fittings & supplies for your ongoing work.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {recommendedItems.map((productId) => {
                      const meta = getProductMeta(productId);
                      return (
                        <div key={productId} className="rounded-xl border border-[#d0daea] bg-white p-3 flex gap-3 items-center">
                          <div className="h-14 w-16 overflow-hidden rounded-md bg-[#f8f9fb] flex-shrink-0 border border-[#d0daea]/60">
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
                            <div className="font-semibold text-xs text-[#0D1B2A] truncate">
                              {meta.title}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 h-7 text-xs border-[#003B6F]/30 text-[#003B6F] hover:bg-[#003B6F] hover:text-white"
                              onClick={() => addToCart(productId, 1)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            {/* Action Box */}
            <Card className="border-[#003B6F]/30 shadow-md bg-white">
              <CardHeader className="bg-[#003B6F]/5 border-b border-[#d0daea] pb-4">
                <CardTitle className="text-[#003B6F] text-lg font-bold">
                  Inquiry Summary
                </CardTitle>
                <CardDescription className="text-xs text-[#5a6a82]">
                  Direct wholesale & retail inquiries for Chittorgarh & surrounding regions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold text-[#0D1B2A]">
                  <span>Total Items</span>
                  <span className="bg-[#003B6F] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {cartCount} units
                  </span>
                </div>

                <div className="space-y-2 py-3 border-y border-[#d0daea] text-xs text-[#5a6a82]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-[#003B6F] flex-shrink-0" />
                    <span>100% Genuine, ISI Marked & Certified Materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="size-4 text-[#003B6F] flex-shrink-0" />
                    <span>Same-day site delivery support available</span>
                  </div>
                </div>

                {cartItems.length > 0 ? (
                  <div className="space-y-3 pt-2">
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm h-11 shadow"
                      onClick={requestViaWhatsapp}
                    >
                      <MessageCircle className="size-4 mr-2" />
                      Inquire via WhatsApp (Instant)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#003B6F] text-[#003B6F] hover:bg-[#003B6F] hover:text-white font-semibold text-sm h-10"
                      onClick={requestOnWebsite}
                    >
                      <Send className="size-3.5 mr-2" />
                      Submit Formal Inquiry on Site
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-center text-[#5a6a82] italic">
                    Add products to enable WhatsApp and online quotation requests.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Wishlist Box */}
            <Card className="border-[#d0daea] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 text-red-500 fill-red-500" />
                    <CardTitle className="text-[#0D1B2A] text-sm font-bold">
                      Saved for Later ({wishlistCount})
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <p className="text-xs text-[#5a6a82]">Your saved list is empty.</p>
                ) : (
                  <ScrollArea className="h-48 pr-2">
                    <div className="space-y-2">
                      {wishlistItems.map((productId) => {
                        const meta = getProductMeta(productId);
                        return (
                          <div key={productId} className="flex items-center justify-between gap-2 p-2 rounded-lg border border-[#d0daea] text-xs">
                            <span className="font-medium text-[#0D1B2A] truncate flex-1">
                              {meta.title}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => addToCart(productId, 1)}
                                className="px-2 py-1 bg-[#003B6F] text-white rounded text-[10px] font-semibold hover:bg-[#00244A]"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => toggleWishlist(productId)}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="size-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
