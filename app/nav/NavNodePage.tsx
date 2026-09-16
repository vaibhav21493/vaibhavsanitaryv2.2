import { ArrowLeft, ChevronRight, Home, Search, Heart, ShoppingCart, MessageCircle, SlidersHorizontal, Plus, Minus } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import StarRating from "../components/StarRating";

import { getBreadcrumbPath, getNavNode, NAV_ROOT_ID } from "./navTree";
import { useShop } from "../shop/ShopContext";

export default function NavNodePage() {
  const { nodeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getRating, setRating, addToCart, decrementCart, toggleWishlist, wishlist, getCartQuantity } = useShop();

  const [filterQuery, setFilterQuery] = useState(searchParams.get("q") ?? "");

  const id = nodeId ?? NAV_ROOT_ID;
  const node = getNavNode(id);

  if (!node) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="container mx-auto px-4 py-12 vs-route-enter">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Button variant="outline" onClick={() => navigate(-1)} className="border-[#d0daea]">
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
            <Button asChild className="bg-[#003B6F] hover:bg-[#00244A] text-white">
              <Link to="/">Go to Store</Link>
            </Button>
          </div>

          <div className="max-w-md mx-auto rounded-2xl border border-[#d0daea] bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#0D1B2A]">Category Not Found</h1>
            <p className="mt-2 text-sm text-[#5a6a82]">
              The requested product category or item does not exist or has been relocated.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild className="bg-[#003B6F] text-white">
                <Link to="/nav/root">Browse All Categories</Link>
              </Button>
              <Button variant="outline" asChild className="border-[#d0daea]">
                <Link to="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbPath(node.id);
  const hasChildren = node.children.length > 0;

  const childNodes = useMemo(() => {
    return node.children
      .map((childId) => getNavNode(childId))
      .filter(Boolean)
      .filter((child) => {
        if (!filterQuery.trim()) return true;
        const q = filterQuery.toLowerCase();
        return (
          child!.title.toLowerCase().includes(q) ||
          (child!.description && child!.description.toLowerCase().includes(q))
        );
      });
  }, [node, filterQuery]);

  const handleBack = () => {
    if (node.parentId) {
      navigate(`/nav/${node.parentId}`);
    } else {
      navigate("/");
    }
  };

  const handleInquireWhatsapp = () => {
    const msg = `Hi Vaibhav Sanitary, I am looking for details and pricing on: ${node.title}`;
    window.open(`https://wa.me/916377307050?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ── Top Breadcrumbs & Utility Bar ── */}
      <div className="bg-white border-b border-[#d0daea] sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="border-[#d0daea] text-xs h-8"
            >
              <ArrowLeft className="size-3.5 mr-1" />
              Back
            </Button>
            <Breadcrumb>
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1 hover:text-[#003B6F]">
                      <Home className="size-3" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {node.id !== NAV_ROOT_ID && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/nav/root" className="hover:text-[#003B6F]">
                          Catalog
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}

                {breadcrumbs
                  .filter((b) => b.id !== NAV_ROOT_ID)
                  .map((b, idx, arr) => {
                    const isLast = idx === arr.length - 1;
                    return (
                      <span key={b.id} className="contents">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="font-semibold text-[#003B6F]">
                              {b.title}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link to={`/nav/${b.id}`} className="hover:text-[#003B6F]">
                                {b.title}
                              </Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </span>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleInquireWhatsapp}
              className="border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 text-xs h-8"
            >
              <MessageCircle className="size-3.5 mr-1 text-[#25D366]" />
              Inquire via WhatsApp
            </Button>
            <Button asChild size="sm" className="bg-[#003B6F] hover:bg-[#00244A] text-white text-xs h-8">
              <Link to="/cart">
                <ShoppingCart className="size-3.5 mr-1" />
                View Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 vs-route-enter">
        {/* ── Category Hero Header ── */}
        <div className="rounded-2xl border border-[#d0daea] bg-white overflow-hidden shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="p-6 md:p-8 md:col-span-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="bg-[#003B6F]/10 text-[#003B6F] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {node.id === NAV_ROOT_ID ? "Complete Catalog" : "Product Category"}
                </span>
                <span className="text-xs text-[#5a6a82]">
                  {hasChildren ? `${node.children.length} sections available` : "Verified Supply"}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0D1B2A] leading-tight">
                {node.title}
              </h1>
              {node.description && (
                <p className="mt-3 text-sm md:text-base text-[#5a6a82] leading-relaxed max-w-2xl">
                  {node.description}
                </p>
              )}

              {/* Quick Search within category */}
              {hasChildren && (
                <div className="mt-6 max-w-md relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5a6a82]" />
                  <input
                    type="text"
                    placeholder={`Search within ${node.title}...`}
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#d0daea] bg-[#f8f9fb] focus:bg-white focus:outline-none focus:border-[#003B6F] transition"
                  />
                  {filterQuery && (
                    <button
                      onClick={() => setFilterQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5a6a82] hover:text-[#0D1B2A]"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>

            {node.image && (
              <div className="relative min-h-[180px] md:min-h-0 bg-[#003B6F]/5">
                <img
                  src={node.image}
                  alt={node.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-transparent to-transparent opacity-80" />
              </div>
            )}
          </div>
        </div>

        {/* ── Products & Subcategories Grid ── */}
        {hasChildren ? (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-[#003B6F]" />
                <h2 className="text-lg font-bold text-[#0D1B2A]">
                  {filterQuery ? `Results for "${filterQuery}"` : "Available Products & Options"}
                </h2>
                <span className="text-xs text-[#5a6a82] ml-2">
                  ({childNodes.length} items)
                </span>
              </div>
            </div>

            {childNodes.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#d0daea] p-12 text-center">
                <p className="text-[#5a6a82] text-sm">No items found matching "{filterQuery}".</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterQuery("")}
                  className="mt-4 border-[#d0daea]"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {childNodes.map((child) => {
                  const childHasChildren = child!.children.length > 0;
                  const inCartQty = getCartQuantity(child!.id);
                  const isWishlisted = wishlist.has(child!.id);

                  return (
                    <div
                      key={child!.id}
                      className="bg-white rounded-xl overflow-hidden border border-[#d0daea] hover:border-[#003B6F]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Image Area */}
                      <div className="relative aspect-square overflow-hidden bg-[#f8f9fb]">
                        {child!.image ? (
                          <ImageWithFallback
                            src={child!.image}
                            alt={child!.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#003B6F]/5 text-[#003B6F] font-semibold text-lg">
                            {child!.title.slice(0, 2).toUpperCase()}
                          </div>
                        )}

                        {/* Wishlist button */}
                        <button
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow ${
                            isWishlisted
                              ? "bg-red-50 border border-red-200 text-red-500"
                              : "bg-white/90 border border-[#d0daea] hover:bg-red-50 hover:border-red-200 text-gray-500"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(child!.id);
                          }}
                          aria-label="Wishlist toggle"
                        >
                          <Heart
                            className={`size-4 transition-colors ${
                              isWishlisted ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </button>

                        {childHasChildren && (
                          <span className="absolute bottom-3 left-3 bg-[#003B6F] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                            {child!.children.length} Options
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {childHasChildren ? (
                            <Link
                              to={`/nav/${child!.id}`}
                              className="group-hover:text-[#003B6F] transition-colors"
                            >
                              <h3 className="font-bold text-[#0D1B2A] text-sm leading-snug line-clamp-2">
                                {child!.title}
                              </h3>
                            </Link>
                          ) : (
                            <h3 className="font-bold text-[#0D1B2A] text-sm leading-snug line-clamp-2">
                              {child!.title}
                            </h3>
                          )}

                          {child!.description && (
                            <p className="text-xs text-[#5a6a82] mt-1 line-clamp-2 leading-relaxed">
                              {child!.description}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#d0daea]/60">
                          {/* Rating Row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <StarRating
                              value={getRating(child!.id)}
                              onChange={(r) => setRating(child!.id, r)}
                              stopLinkNavigation
                              label={`Rating for ${child!.title}`}
                            />
                            <span className="text-[10px] text-[#5a6a82]">
                              {getRating(child!.id) ? `${getRating(child!.id)}/5` : "Rate"}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          {childHasChildren ? (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="w-full border-[#003B6F]/30 text-[#003B6F] hover:bg-[#003B6F] hover:text-white transition-colors"
                            >
                              <Link to={`/nav/${child!.id}`} className="flex items-center justify-center gap-1">
                                Explore Options
                                <ChevronRight className="size-3.5" />
                              </Link>
                            </Button>
                          ) : inCartQty > 0 ? (
                            <div className="flex items-center justify-between gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 border-[#d0daea]"
                                onClick={() => decrementCart(child!.id)}
                              >
                                <Minus className="size-3" />
                              </Button>
                              <span className="text-sm font-bold text-[#0D1B2A]">
                                {inCartQty} in cart
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 border-[#d0daea]"
                                onClick={() => addToCart(child!.id, 1)}
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>
                          ) : (
                            <button
                              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#003B6F] hover:bg-[#00244A] text-white text-xs font-semibold transition-colors shadow-sm"
                              onClick={() => addToCart(child!.id, 1)}
                            >
                              <ShoppingCart className="size-3.5" />
                              Add to Inquiry Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          /* Leaf Details Section */
          <div className="bg-white rounded-2xl border border-[#d0daea] p-8 shadow-sm max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#0D1B2A]">{node.title}</h2>
            {node.description && (
              <p className="mt-3 text-sm text-[#5a6a82] leading-relaxed">{node.description}</p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => addToCart(node.id, 1)}
                className="bg-[#003B6F] hover:bg-[#00244A] text-white px-6"
              >
                <ShoppingCart className="size-4 mr-2" />
                Add to Cart ({getCartQuantity(node.id)} in cart)
              </Button>
              <Button
                variant="outline"
                onClick={handleInquireWhatsapp}
                className="border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10"
              >
                <MessageCircle className="size-4 mr-2 text-[#25D366]" />
                Inquire on WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
