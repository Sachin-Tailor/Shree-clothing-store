'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, Gem, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/context/AppContext';

export default function Home() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    isCheckoutOpen,
    closeCheckout,
    setIsCheckoutOpen,
  } = useApp();

  // Scroll reveal observer
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <>
      <Navbar />

      <main>
        {/* ─────────────────────────── HERO ─────────────────────────── */}
        <section id="home" className="relative min-h-screen overflow-hidden pt-20 flex items-center">

          {/* ── Full-screen red saree background image ── */}
          <div className="absolute inset-0">
            {/* Using CSS background-image directly for reliability */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1920&auto=format&fit=crop')`,
              }}
            />
            {/* Fallback: Next.js Image with onError */}
            <Image
              src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1920&auto=format&fit=crop"
              alt="Beautiful Red Saree — Shree A"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Strong layered gradient so text is always readable */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(105deg, rgba(30,14,8,0.97) 0%, rgba(30,14,8,0.90) 38%, rgba(30,14,8,0.55) 65%, rgba(30,14,8,0.20) 100%)'
            }} />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32"
              style={{ background: 'linear-gradient(to top, #FAF8F5, transparent)' }} />
          </div>

          {/* ── Decorative gold border left edge ── */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ background: 'linear-gradient(to bottom, transparent, #C8A97E, #8D6E63, transparent)' }} />

          {/* ── Main layout: left text / right image peek ── */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 py-16 lg:py-0">
            <div className="max-w-2xl">

              {/* Top badge */}
              <div
                className="inline-flex items-center gap-3 mb-8"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both', opacity: 0 }}
              >
                <div className="h-px w-10 bg-[#C8A97E]" />
                <span className="text-[#C8A97E] text-xs uppercase tracking-[0.35em] font-semibold">
                  Handcrafted Since 2012
                </span>
                <div className="h-px w-10 bg-[#C8A97E]" />
              </div>

              {/* Brand name — letter animation */}
              <h1
                className="letter-animate font-serif font-bold text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
              >
                {'SHREE A'.split('').map((c, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.09 + 0.2}s` }}>
                    {c === ' ' ? '\u00A0' : c}
                  </span>
                ))}
              </h1>

              {/* Serif italic subtitle */}
              <p
                className="font-serif italic font-light mb-6 leading-relaxed"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                  color: '#D4B896',
                  animation: 'fadeInUp 0.8s ease-out 0.9s both',
                  opacity: 0,
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}
              >
                Where Tradition Meets Modern Grace
              </p>

              {/* Divider */}
              <div
                className="w-20 h-0.5 mb-7"
                style={{ background: 'linear-gradient(to right, #C8A97E, transparent)', animation: 'fadeInUp 0.8s ease-out 1.0s both', opacity: 0 }}
              />

              {/* Description */}
              <p
                className="text-white/70 font-light leading-relaxed mb-10"
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  maxWidth: '480px',
                  animation: 'fadeInUp 0.8s ease-out 1.1s both',
                  opacity: 0,
                }}
              >
                Discover handwoven sarees, embroidered kurtis &amp; bridal lehengas — 
                each piece a masterwork by India's finest artisans.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4 mb-14"
                style={{ animation: 'fadeInUp 0.8s ease-out 1.25s both', opacity: 0 }}
              >
                <a
                  href="#collections"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-sm uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: '#C8A97E', color: '#1E0E08', boxShadow: '0 8px 30px rgba(200,169,126,0.35)' }}
                >
                  Shop Collections
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/sarees"
                  className="inline-flex items-center gap-2 px-8 py-4 border text-white text-sm uppercase tracking-[0.18em] font-medium hover:bg-white/10 transition-all duration-300"
                  style={{ borderColor: 'rgba(200,169,126,0.5)', color: '#D4B896' }}
                >
                  View Sarees
                </a>
              </div>

              {/* Trust strip */}
              <div
                className="flex flex-wrap gap-x-7 gap-y-3"
                style={{ animation: 'fadeInUp 0.8s ease-out 1.4s both', opacity: 0 }}
              >
                {[
                  { icon: '🚚', text: 'Free Delivery ₹999+' },
                  { icon: '↩️', text: '30-Day Returns' },
                  { icon: '✦', text: '500+ Artisans' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <span className="text-[#C8A97E] text-sm">{item.icon}</span>
                    <span className="text-white/50 text-[11px] uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Scroll hint ── */}
          <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-3"
            style={{ animation: 'fadeInUp 1s ease-out 2s both', opacity: 0 }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#C8A97E]/60" />
            <span className="text-[#C8A97E]/60 text-[9px] uppercase tracking-[0.3em] rotate-90 origin-center mt-2 select-none">Scroll</span>
          </div>

          {/* ── Mobile scroll hint ── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce lg:hidden">
            <ChevronDown className="w-5 h-5 text-white/30" />
          </div>
        </section>

        {/* ─────────────────────────── CATEGORIES ─────────────────────────── */}
        <section className="py-20 bg-white" id="categories">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-shree font-semibold mb-3">Our Curated</p>
              <h2 className="font-serif text-3xl md:text-4xl text-shree-dark font-bold mb-4">Shop by Category</h2>
              <div className="w-14 h-0.5 bg-shree mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Ethnic Wear',
                  sub: 'Sarees & Salwar Suits',
                  img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
                  delay: '0s',
                },
                {
                  name: 'Bridal Collection',
                  sub: 'Lehengas & Bridal Sarees',
                  img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop',
                  delay: '0.15s',
                },
                {
                  name: 'Festive Wear',
                  sub: 'Kurtis & Palazzo Sets',
                  img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
                  delay: '0.3s',
                },
              ].map(cat => (
                <div
                  key={cat.name}
                  className="group relative h-96 overflow-hidden reveal cursor-pointer rounded-sm shadow-sm hover:shadow-lg transition-shadow"
                  style={{ transitionDelay: cat.delay }}
                  onClick={() => {
                    const mapping = { 'Ethnic Wear': 'Suits', 'Bridal Collection': 'Lehengas', 'Festive Wear': 'Kurtis' };
                    setSelectedCategory(mapping[cat.name]);
                    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="font-serif text-2xl text-white font-semibold mb-1">{cat.name}</h3>
                    <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.sub}</p>
                    <span className="text-white text-xs uppercase tracking-wider font-semibold border-b border-white pb-0.5 hover:text-shree-light hover:border-shree-light transition">
                      Shop Now
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── PRODUCTS ─────────────────────────── */}
        <section id="collections" className="py-20 bg-shree-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 reveal gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-shree font-semibold mb-2">Handpicked for You</p>
                <h2 className="font-serif text-3xl md:text-4xl text-shree-dark font-bold">Our Collections</h2>
              </div>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-shree-dark text-white border-shree-dark'
                      : 'bg-white text-shree-dark border-shree-muted hover:border-shree-dark hover:bg-shree-bg'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="font-serif text-xl">No products found</p>
                <button onClick={() => setSelectedCategory('All')} className="mt-3 text-sm text-shree hover:underline">
                  View all collections
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

        {/* ─────────────────────────── BRAND STORY ─────────────────────────── */}
        <section id="about" className="bg-white">
          <div className="flex flex-col lg:flex-row min-h-[620px]">
            {/* Image side */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2074&auto=format&fit=crop"
                alt="Master Artisans at Work"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-shree-dark/40 mix-blend-multiply" />
              {/* Floating stat cards */}
              <div className="absolute bottom-10 left-8 bg-white/95 rounded-sm p-5 shadow-xl">
                <p className="font-serif text-3xl font-bold text-shree-dark">12+</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Years of Excellence</p>
              </div>
              <div className="absolute top-10 right-8 bg-shree text-white rounded-sm p-5 shadow-xl">
                <p className="font-serif text-3xl font-bold">500+</p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">Artisan Partners</p>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:w-1/2 flex items-center justify-center p-10 lg:p-20 reveal">
              <div className="max-w-lg">
                <span className="text-shree text-xs uppercase tracking-[0.3em] font-semibold block mb-4">Our Story</span>
                <h2 className="font-serif text-4xl md:text-5xl text-shree-dark font-bold leading-tight mb-6">
                  Rooted in Tradition.<br />
                  <em className="text-shree not-italic">Designed</em> for Today.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  At <strong className="font-serif text-shree-dark">Shree A</strong>, we celebrate the art of Indian craftsmanship. 
                  We work directly with master weavers and artisans across India to bring you 
                  pieces that honor centuries-old techniques, reimagined for the modern woman.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Every saree, every kurti, and every lehenga tells a story of heritage — 
                  woven with love, dyed with tradition, and stitched with care.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[['10,000+', 'Happy Customers'], ['500+', 'Artisan Partners'], ['200+', 'Products']].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-serif text-2xl text-shree-dark font-bold">{num}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                    </div>
                  ))}
                </div>
                <a href="#collections" className="inline-flex items-center gap-2 text-shree-dark font-semibold border-b-2 border-shree-dark pb-1 hover:text-shree hover:border-shree transition-colors">
                  Explore Collections <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── USP FEATURES ─────────────────────────── */}
        <section className="py-16 bg-shree-bg border-t border-b border-shree-light/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { Icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999', delay: '0s' },
                { Icon: ShieldCheck, title: 'Secure Checkout', desc: '100% safe & encrypted', delay: '0.1s' },
                { Icon: Gem, title: 'Artisan Crafted', desc: 'Premium quality assured', delay: '0.2s' },
                { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns', delay: '0.3s' },
              ].map(({ Icon, title, desc, delay }) => (
                <div key={title} className="reveal" style={{ transitionDelay: delay }}>
                  <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-shree shadow-sm mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base text-shree-dark font-semibold mb-1">{title}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-shree font-semibold mb-3">Customer Love</p>
              <h2 className="font-serif text-3xl md:text-4xl text-shree-dark font-bold">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Priya Sharma',
                  location: 'Mumbai',
                  text: 'The Terracotta Silk Saree is absolutely breathtaking! The quality exceeded my expectations. I got so many compliments at the wedding.',
                  rating: 5,
                  product: 'Terracotta Silk Saree',
                  delay: '0s',
                },
                {
                  name: 'Anjali Mehta',
                  location: 'Pune',
                  text: 'I ordered the Anarkali Suit Set for Diwali and it arrived beautifully packaged. The embroidery is exquisite and the fabric is so comfortable!',
                  rating: 5,
                  product: 'Anarkali Suit Set',
                  delay: '0.15s',
                },
                {
                  name: 'Kavita Patel',
                  location: 'Ahmedabad',
                  text: 'Shree A has become my go-to for traditional wear. The Cotton Block Print Kurti is perfect for daily office wear. Fast delivery too!',
                  rating: 5,
                  product: 'Cotton Block Print Kurti',
                  delay: '0.3s',
                },
              ].map(review => (
                <div
                  key={review.name}
                  className="reveal bg-shree-bg rounded-sm p-7 border border-shree-muted hover:border-shree-light transition-colors"
                  style={{ transitionDelay: review.delay }}
                >
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3 border-t border-shree-muted pt-4">
                    <div className="w-10 h-10 bg-shree-light/20 rounded-full flex items-center justify-center text-shree font-serif font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-shree-dark">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.location} · {review.product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── CTA BANNER ─────────────────────────── */}
        <section className="relative py-20 overflow-hidden bg-shree-dark">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
              alt="CTA background"
              fill
              sizes="100vw"
              className="object-cover mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6 reveal">
            <p className="text-shree-light text-xs uppercase tracking-[0.3em] font-semibold mb-4">Limited Time</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-white/70 mb-8 text-base">
              Use code <strong className="text-shree-light">SHREE20</strong> at checkout. Valid on all products.
            </p>
            <a
              href="#collections"
              className="inline-flex items-center gap-2 bg-white text-shree-dark px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-shree-bg transition-all rounded-sm shadow-xl"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Global Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </>
  );
}
