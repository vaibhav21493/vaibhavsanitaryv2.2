import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ProductQuickActions from "../components/ProductQuickActions";
import StarRating from "../components/StarRating";

import { getBreadcrumbPath, getNavNode, NAV_ROOT_ID } from "./navTree";
import { useShop } from "../shop/ShopContext";

export default function NavNodePage() {
  const { nodeId } = useParams();
  const navigate = useNavigate();
  const { getRating, setRating, addToCart, toggleWishlist, wishlist } = useShop();

  const id = nodeId ?? NAV_ROOT_ID;
  const node = getNavNode(id);

  if (!node) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white">
        <div className="container mx-auto px-4 py-10 vs-route-enter">
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button asChild>
              <Link to="/">Go to store</Link>
            </Button>
          </div>

          <div className="mt-10 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-primary">
              Page not found
            </h1>
            <p className="mt-2 text-muted-foreground">
              This navigation node doesn't exist. Choose a valid section from the
              start.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/nav/root">Start navigation</Link>
              </Button>
              <Button variant="secondary" asChild>
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

  const handleBack = () => {
    if (node.parentId) {
      navigate(`/nav/${node.parentId}`);
    } else if (node.id === NAV_ROOT_ID) {
      navigate("/");
    } else {
      navigate("/nav/root");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4 py-8 vs-route-enter">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/nav/root">
                <Home className="size-4" />
                Start
              </Link>
            </Button>
          </div>

          <Button asChild>
            <Link to="/">Go to store</Link>
          </Button>
        </div>

        <div className="mt-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/nav/root">Card Navigation</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbs
                .filter((b) => b.id !== NAV_ROOT_ID)
                .map((b, idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  return (
                    <span key={b.id} className="contents">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{b.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={`/nav/${b.id}`}>{b.title}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </span>
                  );
                })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <header className="mt-6 rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur">
          <h1 className="text-3xl font-bold text-[#0F2854]">
            {node.emoji ? `${node.emoji} ` : ""}
            {node.title}
          </h1>
          {node.description ? (
            <p className="mt-2 text-gray-600">{node.description}</p>
          ) : null}
        </header>

        {hasChildren ? (
          <section className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {node.children
                .map((childId) => getNavNode(childId))
                .filter(Boolean)
                .map((child) => {
                  const childHasChildren = child!.children.length > 0;
                  
                  if (childHasChildren) {
                    // Node has children - make it clickable
                    return (
                      <Link
                        key={child!.id}
                        to={`/nav/${child!.id}`}
                        className="group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4988C4] focus-visible:ring-offset-2"
                        aria-label={`Open ${child!.title}`}
                      >
                        <Card className="h-full border-[#BDE8F5] bg-white/90 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                          {child!.image ? (
                            <div className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-[#BDE8F5] to-[#4988C4]">
                              <ImageWithFallback
                                src={child!.image}
                                alt={child!.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          ) : null}
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <CardTitle className="text-lg font-semibold text-[#0F2854]">
                                  {child!.emoji ? `${child!.emoji} ` : ""}
                                  {child!.title}
                                </CardTitle>
                                {child!.description ? (
                                  <CardDescription className="mt-1">
                                    {child!.description}
                                  </CardDescription>
                                ) : null}
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="mt-0.5 flex items-center text-[#1C4D8D] opacity-80 transition-opacity group-hover:opacity-100">
                                  <ChevronRight className="size-5" />
                                </div>
                                <ProductQuickActions productId={child!.id} stopLinkNavigation />
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-muted-foreground">
                              {child!.children.length} options
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <StarRating
                                value={getRating(child!.id)}
                                onChange={(r) => setRating(child!.id, r)}
                                stopLinkNavigation
                                label={`Rating for ${child!.title}`}
                              />
                              <span className="text-xs text-muted-foreground">
                                {getRating(child!.id) ? `${getRating(child!.id)}/5` : "Rate"}
                              </span>
                            </div>

                            <div className="mt-3">
                              <Button
                                className="w-full"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCart(child!.id, 1);
                                }}
                              >
                                Add to cart
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  } else {
                    // Leaf node - show as expandable card with details (not clickable)
                    return (
                      <Card
                        key={child!.id}
                        className="h-full border-[#BDE8F5] bg-white/90 transition-all duration-200 hover:shadow-lg"
                      >
                        {child!.image ? (
                          <div className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-[#BDE8F5] to-[#4988C4]">
                            <ImageWithFallback
                              src={child!.image}
                              alt={child!.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-semibold text-[#0F2854]">
                                {child!.emoji ? `${child!.emoji} ` : ""}
                                {child!.title}
                              </CardTitle>
                              {child!.description ? (
                                <CardDescription className="mt-2 text-sm">
                                  {child!.description}
                                </CardDescription>
                              ) : null}
                            </div>
                            <ProductQuickActions productId={child!.id} stopLinkNavigation />
                          </div>
                          <div className="mt-4 flex items-center justify-between gap-2">
                            <StarRating
                              value={getRating(child!.id)}
                              onChange={(r) => setRating(child!.id, r)}
                              stopLinkNavigation
                              label={`Rating for ${child!.title}`}
                            />
                            <span className="text-xs text-muted-foreground">
                              {getRating(child!.id) ? `${getRating(child!.id)}/5` : "Rate"}
                            </span>
                          </div>

                          <div className="mt-3">
                            <Button className="w-full" onClick={() => addToCart(child!.id, 1)}>
                              Add to cart
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  }
                })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
