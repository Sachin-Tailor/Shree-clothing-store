'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Heart } from 'lucide-react';

const footerLinks = {
  Collections: ['New Arrivals', 'Sarees', 'Kurtis', 'Lehengas', 'Suits', 'Festive Wear', 'Bridal Collection'],
  Assistance: ['Contact Us', 'Shipping & Returns', 'Size Guide', 'Track My Order', 'FAQ', 'Exchange Policy'],
  Company: ['About Shree A', 'Our Story', 'Artisan Partners', 'Sustainability', 'Careers', 'Press'],
};

export default function Footer() {
  return (
    <footer className="bg-shree-dark text-white">
      {/* Top banner */}
      <div className="border-b border-white/10 bg-shree/20">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 text-white/80">
            <span>🚚</span> Free Delivery on orders above ₹999
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <span>↩️</span> 30-Day Easy Returns
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <span>🔒</span> 100% Secure Payments
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand column */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-4xl font-bold tracking-[0.2em] mb-5">SHREE A</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Curating the finest blend of traditional Indian craftsmanship and modern aesthetic design. 
              Celebrating the art of handcrafted fashion for every woman.
            </p>
            
            {/* Contact */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-shree-light flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-shree-light flex-shrink-0" />
                <span>hello@shreea.in</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-shree-light flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-shree-dark transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-base text-white font-semibold mb-5 pb-2 border-b border-white/10">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/55 hover:text-white text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-xl font-semibold mb-1">Join the Inner Circle</h4>
              <p className="text-white/55 text-sm">Subscribe for exclusive offers, new arrivals & style tips.</p>
            </div>
            <div className="flex w-full md:w-auto gap-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3 text-sm focus:outline-none focus:border-white transition w-full md:w-72"
              />
              <button className="bg-shree text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-shree-light transition flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 Shree A. All rights reserved. Made with <Heart className="w-3 h-3 inline text-shree-light" /> in India.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
