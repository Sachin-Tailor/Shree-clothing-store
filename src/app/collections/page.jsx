'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useApp, CATEGORIES } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import { useEffect } from 'react';

function CollectionsContent() {
  const { filteredProducts, selectedCategory, setSelectedCategory, isCheckoutOpen, closeCheckout } = useApp();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams, setSelectedCategory]);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="bg-shree-dark py-16 px-6 text-center">
          <p className="text-shree-light text-xs uppercase tracking-[0.3em] mb-3">Handpicked for You</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-bold">All Collections</h1>
          <p className="text-white/60 text-sm mt-3 max-w-md mx-auto">Explore our complete range of handcrafted Indian ethnic wear</p>
        </div>

        <section className="py-14 bg-shree-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all ${
                    selectedCategory === cat
                      ? 'bg-shree-dark text-white border-shree-dark'
                      : 'bg-white text-shree-dark border-shree-muted hover:border-shree-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mb-6">{filteredProducts.length} products found</p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-shree-dark">No products found</p>
                <button onClick={() => setSelectedCategory('All')} className="mt-3 text-sm text-shree hover:underline">
                  View all
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-shree-bg" />}>
      <CollectionsContent />
    </Suspense>
  );
}
