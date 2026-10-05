import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CAFE_INFO } from '../data/menuData';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#1C120C] text-[#E8DCCF] text-xs py-2 px-4 border-b border-[#2C1E17]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-[#D8AF3B]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open Now until 11:00 PM
            </span>
            <span className="hidden sm:inline text-[#7A6B63]">·</span>
            <span className="hidden sm:flex items-center gap-1 text-[#C4B7AC]">
              <MapPin className="w-3.5 h-3.5 text-[#D8AF3B]" />
              Udham Singh Chowk, Malwal Road, Firozpur
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${CAFE_INFO.phoneDial}`}
              className="flex items-center gap-1 text-[#E8DCCF] hover:text-[#D8AF3B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D8AF3B]" />
              <span className="font-mono tabular-nums">{CAFE_INFO.phone}</span>
            </a>
            <span className="text-[#59473D]">|</span>
            <span className="text-[#D8AF3B] font-medium">4.04 ★ Google Reviews</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EDE5D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single element brand mark */}
          <a href="#" className="group flex items-center">
            <BrandLogo variant="dark" />
          </a>

          {/* Zone 2: 4-6 text links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A3B32]">
            <a
              href="#menu"
              className="hover:text-[#1F1510] hover:underline underline-offset-8 decoration-[#C59B27] transition-all"
            >
              Menu & Order
            </a>
            <a
              href="#specialty-kaffi"
              className="hover:text-[#1F1510] hover:underline underline-offset-8 decoration-[#C59B27] transition-all"
            >
              Specialty Kaffi
            </a>
            <a
              href="#artisan-bakes"
              className="hover:text-[#1F1510] hover:underline underline-offset-8 decoration-[#C59B27] transition-all"
            >
              Artisan Bakes
            </a>
            <a
              href="#celebration-cakes"
              className="hover:text-[#1F1510] hover:underline underline-offset-8 decoration-[#C59B27] transition-all"
            >
              Custom Cakes
            </a>
            <a
              href="#location-hours"
              className="hover:text-[#1F1510] hover:underline underline-offset-8 decoration-[#C59B27] transition-all"
            >
              Visit Us (9 mins)
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1F1510] bg-[#F3ECE1] hover:bg-[#E9DFD0] rounded-lg transition-colors border border-[#DDD3C2]"
            >
              Reserve Table
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1F1510] hover:bg-[#33221A] rounded-lg transition-all shadow-sm hover:shadow active:scale-95"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8AF3B]" />
              <span className="hidden sm:inline">Order Bag</span>
              {cartItemCount > 0 ? (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-[#C59B27] text-[#1F1510] rounded-full tabular-nums">
                  {cartItemCount}
                </span>
              ) : (
                <span className="font-mono tabular-nums text-xs opacity-75">0</span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D1E17] hover:bg-[#F2ECE2] rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6EE] border-b border-[#E3D9C9] px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-[#2D1E17]">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C59B27]"
              >
                Menu & Order Online
              </a>
              <a
                href="#specialty-kaffi"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C59B27]"
              >
                Specialty Kaffi Bar
              </a>
              <a
                href="#artisan-bakes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C59B27]"
              >
                Artisan Croissants & Savories
              </a>
              <a
                href="#celebration-cakes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C59B27]"
              >
                Custom Celebration Cakes
              </a>
              <a
                href="#location-hours"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#C59B27]"
              >
                Location & Google Directions
              </a>
            </nav>

            <div className="pt-3 border-t border-[#E3D9C9] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 text-xs font-semibold text-center bg-[#EAE0D2] rounded-lg text-[#1F1510]"
              >
                Book Cozy Corner / Table
              </button>
              <a
                href={`tel:${CAFE_INFO.phoneDial}`}
                className="w-full py-2.5 text-xs font-semibold text-center bg-[#1F1510] text-[#D8AF3B] rounded-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" /> Call {CAFE_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
