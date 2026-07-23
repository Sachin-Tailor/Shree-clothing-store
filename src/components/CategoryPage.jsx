'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import { useApp, PRODUCTS } from '@/context/AppContext';

/**
 * Reusable category page layout
 * @param {string} title - Page title (e.g. "Sarees")
 * @param {string} subtitle - Subtitle text
 * @param {string} heroImage - URL for hero banner image
 * @param {string[]} categories - Category names to filter products by
 * @param {string} description - Short paragraph about the category
 */
export default function CategoryPage({ title, subtitle, heroImage, categories, description }) {
  const { isCheckoutOpen, closeCheckout } = useApp();

  const products = PRODUCTS.filter(p => categories.includes(p.category));

  // Scroll reveal
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
  }, []);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* ── Hero Banner ── */}
        <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Blur + dark overlay */}
            <div
              className="absolute inset-0"
              style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shree-dark/80 via-shree-dark/30 to-transparent" />
          </div>

          {/* Text */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-10 w-full">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs uppercase tracking-wider mb-4 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-2">{title}</h1>
            <p className="text-white/70 text-sm md:text-base max-w-xl">{subtitle}</p>
          </div>
        </section>

        {/* ── Description ── */}
        {description && (
          <div className="bg-white border-b border-shree-muted">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">{description}</p>
            </div>
          </div>
        )}

        {/* ── Products Grid ── */}
        <section className="py-16 bg-shree-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500">{products.length} products</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-shree-dark mb-3">Coming Soon</p>
                <p className="text-gray-500 text-sm">We're adding more beautiful pieces. Check back soon!</p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 text-shree border-b border-shree pb-0.5 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Browse All Collections
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                {products.map((product, idx) => (
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
