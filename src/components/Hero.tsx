import React from 'react';
import { ArrowRight, MapPin, Phone, Star, Navigation, Sparkles, Coffee } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';
import heroImg from '../assets/images/hero_cafe_storefront_1791209711385.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomCake: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenCustomCake,
  onOpenReservation,
}) => {
  return (
    <section className="relative bg-[#1A120E] text-[#FDFBF7] overflow-hidden">
      {/* Background ambient gradient and storefront photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="100 Miles Kaffi & Bakes Storefront in Firozpur"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured dark scrim gradient for contrast compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140D0A] via-[#1A120E]/85 to-[#1A120E]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed metadata kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#D8AF3B] font-medium mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Udham Singh Chowk, Firozpur
            </span>
            <span aria-hidden="true" className="text-[#6E5545]">·</span>
            <span>Closes 11:00 PM</span>
            <span aria-hidden="true" className="text-[#6E5545]">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#D8AF3B] text-[#D8AF3B]" />
              <span className="font-mono tabular-nums">4.04</span> (150+ Reviews)
            </span>
            <span aria-hidden="true" className="text-[#6E5545]">·</span>
            <span className="text-[#E7DACD] font-mono tabular-nums">9 mins away</span>
          </div>

          {/* Main Title - No orphan words with text-balance */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance mb-6">
            Contemporary Coffee & Artisan Bakes in Firozpur.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#C8B8AB] font-normal leading-relaxed max-w-2xl mb-8">
            {CAFE_INFO.tagline} From slow-pulled cortados on walnut trays to hot scrambled egg croissants and viral dessert tubs, welcome to your neighbourhood haven.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#140D0A] bg-[#D8AF3B] hover:bg-[#E5BE4A] rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <span>Explore Menu & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/20 transition-all backdrop-blur-sm"
            >
              <Navigation className="w-4 h-4 text-[#D8AF3B]" />
              <span>Get Directions (9 mins)</span>
            </a>

            <button
              onClick={onOpenCustomCake}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#E4D5C7] hover:text-white bg-transparent hover:bg-white/5 rounded-lg border border-[#4D3A2F] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D8AF3B]" />
              <span>Custom Celebration Cake</span>
            </button>
          </div>

          {/* Quick trust metrics adjacent to claim */}
          <div className="pt-6 border-t border-[#3A2920] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-[#A89689]">
            <div>
              <div className="font-mono text-white text-base sm:text-lg font-semibold tabular-nums">100%</div>
              <div className="text-[11px] sm:text-xs">Arabica & Specialty Roasts</div>
            </div>
            <div>
              <div className="font-mono text-white text-base sm:text-lg font-semibold tabular-nums">36-Layer</div>
              <div className="text-[11px] sm:text-xs">French Butter Croissants</div>
            </div>
            <div>
              <div className="font-mono text-white text-base sm:text-lg font-semibold tabular-nums">Fresh Daily</div>
              <div className="text-[11px] sm:text-xs">Celebration Cakes & Tubs</div>
            </div>
            <div>
              <div className="font-mono text-white text-base sm:text-lg font-semibold tabular-nums">Dine-In</div>
              <div className="text-[11px] sm:text-xs">& Swift Local Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
