import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowRight, Heart, Users, Award, Leaf } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us — Shree A | Our Story & Mission',
  description: 'Learn about Shree A — our journey, our artisan partners, and our commitment to celebrating traditional Indian clothing.',
};

const values = [
  { Icon: Heart, title: 'Crafted with Love', desc: 'Every piece is handmade by artisans who have devoted their lives to their craft.' },
  { Icon: Users, title: 'Community First', desc: 'We work directly with 500+ artisan families across India, ensuring fair wages and sustainable livelihoods.' },
  { Icon: Award, title: 'Uncompromising Quality', desc: 'Only premium-grade fabrics, natural dyes, and authentic techniques make it into our collections.' },
  { Icon: Leaf, title: 'Sustainable Fashion', desc: 'We believe in slow fashion — timeless pieces that outlast trends and reduce environmental impact.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="relative h-80 md:h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2074&auto=format&fit=crop"
              alt="Artisans at work"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shree-dark/85 via-shree-dark/30 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12 w-full">
            <p className="text-shree-light text-xs uppercase tracking-[0.3em] mb-3">Who We Are</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">Our Story</h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-shree text-xs uppercase tracking-[0.3em] font-semibold">Est. 2012 · Mumbai, India</span>
                <h2 className="font-serif text-4xl text-shree-dark font-bold mt-4 mb-6 leading-tight">
                  Rooted in Tradition.<br />
                  <em className="text-shree not-italic">Designed</em> for Today.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Shree A was born out of a simple belief — that the most beautiful clothing in the world is made by hand, with love, by artists who have spent a lifetime mastering their craft.
                </p>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Founded in 2012 in Mumbai, we started as a small collective working directly with weavers in Varanasi, block printers in Jaipur, and embroiderers in Lucknow. Today, we partner with over 500 artisan families across India, bringing their extraordinary work to women all over the country.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Our collections celebrate the diversity of Indian textile traditions — from the opulent zari work of Banarasi silk to the earthy beauty of hand block-printed cotton. Every garment tells a story of skill, patience, and artistry.
                </p>

                <div className="flex gap-10 mb-8">
                  {[['12+', 'Years'], ['500+', 'Artisans'], ['10,000+', 'Customers']].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-serif text-3xl text-shree-dark font-bold">{num}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 bg-shree-dark text-white px-7 py-3.5 text-sm uppercase tracking-wider font-semibold hover:bg-shree transition-colors rounded-sm"
                >
                  Shop Collections <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {[
                  { src: 'https://images.unsplash.com/photo-1617627143233-89b9c1f87a7c?q=80&w=600&auto=format&fit=crop', cls: 'row-span-2' },
                  { src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop', cls: '' },
                  { src: 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=600&auto=format&fit=crop', cls: '' },
                ].map((img, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-sm ${img.cls}`}>
                    <Image src={img.src} alt="Artisan work" fill sizes="300px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-shree-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-shree text-xs uppercase tracking-[0.3em] font-semibold mb-3">What We Stand For</p>
              <h2 className="font-serif text-3xl md:text-4xl text-shree-dark font-bold">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-sm p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-shree-bg rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-shree" />
                  </div>
                  <h3 className="font-serif text-lg text-shree-dark font-semibold mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
