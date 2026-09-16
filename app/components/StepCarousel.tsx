import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Heart, Plus, Minus, ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import StarRating from './StarRating';
import { useShop } from '../shop/ShopContext';
import { Button } from './ui/button';

interface StepItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  navId?: string;
}

interface StepCarouselProps {
  items: StepItem[];
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#d0daea] hover:border-[#003B6F] hover:bg-[#003B6F] text-[#003B6F] hover:text-white p-2.5 rounded-full transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#d0daea] hover:border-[#003B6F] hover:bg-[#003B6F] text-[#003B6F] hover:text-white p-2.5 rounded-full transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export default function StepCarousel({ items }: StepCarouselProps) {
  const { getRating, setRating, addToCart, decrementCart, toggleWishlist, wishlist, getCartQuantity } = useShop();

  const settings = {
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const CardInner = ({ item }: { item: StepItem }) => {
    const isWishlisted = item.navId ? wishlist.has(item.navId) : false;
    const cartQty = item.navId ? getCartQuantity(item.navId) : 0;

    return (
      <div className="card-hover-effect rounded-2xl overflow-hidden border border-[#d0daea] bg-white flex flex-col justify-between group cursor-pointer h-full">
        {/* Image Area with smooth zoom & gradient overlay */}
        <div className="relative aspect-square overflow-hidden bg-[#f8f9fb]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Smooth hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Single Wishlist Button with bounce animation */}
          {item.navId && (
            <button
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isWishlisted
                  ? 'bg-red-50 text-red-500 border border-red-200 scale-105'
                  : 'bg-white/90 text-gray-500 border border-[#d0daea] hover:bg-red-50 hover:text-red-500 hover:border-red-200 hover:scale-110'
              } active:scale-90`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(item.navId!);
              }}
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isWishlisted ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
          )}

          {/* Subtle Verified Badge */}
          <span className="absolute bottom-3 left-3 bg-[#003B6F]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Verified Supply
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#0D1B2A] text-sm leading-snug group-hover:text-[#003B6F] transition-colors duration-200 line-clamp-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs text-[#5a6a82] mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#d0daea]/60">
            {/* Rating row with interactive stars */}
            {item.navId && (
              <div className="mb-3 flex items-center justify-between gap-2">
                <StarRating
                  value={getRating(item.navId)}
                  onChange={(r) => setRating(item.navId!, r)}
                  stopLinkNavigation
                  label={`Rating for ${item.title}`}
                />
                <span className="text-[10px] font-semibold text-[#5a6a82]">
                  {getRating(item.navId) ? `${getRating(item.navId)}/5` : 'Rate'}
                </span>
              </div>
            )}

            {/* Cart control with smooth button states */}
            {item.navId && (
              <div>
                {cartQty > 0 ? (
                  <div className="flex items-center justify-between gap-2 bg-[#f8f9fb] p-1 rounded-xl border border-[#d0daea]">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-lg border-[#d0daea] hover:border-[#003B6F] hover:bg-white active:scale-90 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        decrementCart(item.navId!);
                      }}
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="text-xs font-bold text-[#003B6F]">
                      {cartQty} in cart
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-lg border-[#d0daea] hover:border-[#003B6F] hover:bg-white active:scale-90 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(item.navId!, 1);
                      }}
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#003B6F] hover:bg-[#00244A] text-white text-xs font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-98"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item.navId!, 1);
                    }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative px-2">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="p-2.5 h-full">
            {item.navId ? (
              <Link
                to={`/nav/${item.navId}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003B6F] focus-visible:ring-offset-2 rounded-2xl h-full"
                aria-label={`Open ${item.title}`}
              >
                <CardInner item={item} />
              </Link>
            ) : (
              <CardInner item={item} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
