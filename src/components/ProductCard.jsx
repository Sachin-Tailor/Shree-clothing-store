'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Heart, Star, Eye, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, openCheckout } = useApp();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    openCheckout([{ ...product, selectedSize, selectedColor, qty: 1, key: `${product.id}-${selectedSize}-${selectedColor}` }]);
  };

  return (
    <div
      className="group cursor-pointer reveal"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image container */}
      <div className="relative bg-shree-muted aspect-[3/4] overflow-hidden mb-3 rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
        
        {/* Product image */}
        <Image
          src={imageError ? 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=800&auto=format&fit=crop' : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />

        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-shree-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          {/* Buy Now */}
          <button
            id={`buy-now-${product.id}`}
            onClick={handleBuyNow}
            className="w-full bg-white text-shree-dark text-xs uppercase tracking-wider font-semibold py-2.5 px-4 hover:bg-shree hover:text-white transition-all duration-200 flex items-center justify-center gap-2 rounded-sm"
          >
            <Zap className="w-3.5 h-3.5" /> Buy Now
          </button>

          {/* Add to Cart */}
          <button
            id={`add-cart-${product.id}`}
            onClick={handleAddToCart}
            className="w-full bg-shree-dark text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-4 hover:bg-shree transition-all duration-200 flex items-center justify-center gap-2 rounded-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-shree text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-green-600 text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(w => !w); }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow transition hover:shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-shree'}`} />
        </button>

        {/* Quick size selector on hover */}
        {product.sizes.length > 1 && (
          <div className="absolute bottom-[110px] left-0 right-0 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-wrap gap-1 justify-center">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                  className={`text-[10px] px-2 py-1 border font-medium rounded-sm transition-all ${
                    selectedSize === size
                      ? 'bg-shree-dark text-white border-shree-dark'
                      : 'bg-white text-shree-dark border-gray-200 hover:border-shree-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-shree font-semibold">{product.tag}</p>
        <h3 className="font-serif text-base text-shree-dark leading-tight group-hover:text-shree transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-shree-dark font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
