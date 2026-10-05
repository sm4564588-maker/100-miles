import React from 'react';
import { BrandLogo } from './BrandLogo';
import { CAFE_INFO } from '../data/menuData';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenCustomCake: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenCustomCake }) => {
  return (
    <footer className="bg-[#140D0A] text-[#F3EBE1] border-t border-[#2A1C15] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C1E17]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-xs sm:text-sm text-[#A89689] max-w-sm leading-relaxed">
              100 Miles Kaffi & Bakes is a contemporary café and bakery crafted for those who appreciate great coffee, fresh bakes, and memorable moments in Firozpur, Punjab.
            </p>
            <div className="pt-2 text-xs text-[#D8AF3B] font-mono tabular-nums">
              Udham Singh Chowk, Malwal Road, Firozpur · 152002
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D8AF3B]">
              Quick Exploration
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B7AC]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Artisanal Coffee & Bakes Menu
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Signature Cortado & Flat White
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Stuffed Egg Croissants
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCustomCake}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Birthday & Anniversary Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-white transition-colors text-left"
                >
                  Fireplace Table Reservation
                </button>
              </li>
            </ul>
          </div>

          {/* Operating hours & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D8AF3B]">
              Hours & Inquiries
            </h4>
            <div className="space-y-2 text-xs text-[#C4B7AC]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D8AF3B] shrink-0" />
                <span>Daily: 8:30 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8AF3B] shrink-0" />
                <a href={`tel:${CAFE_INFO.phoneDial}`} className="hover:text-white font-mono tabular-nums">
                  {CAFE_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8AF3B] shrink-0 mt-0.5" />
                <span>Udham Singh Chowk, Malwal Road, Firozpur, Punjab 152002</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A685D] gap-4">
          <p>© {new Date().getFullYear()} 100 Miles Kaffi & Bakes. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Freshly baked and brewed with care in Firozpur</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
