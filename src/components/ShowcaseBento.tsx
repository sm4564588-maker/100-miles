import React from 'react';
import { ArrowUpRight, Flame, Heart, Sparkles, Coffee } from 'lucide-react';
import { MenuItem } from '../types';

interface ShowcaseBentoProps {
  onSelectItem: (item: MenuItem) => void;
  items: MenuItem[];
}

export const ShowcaseBento: React.FC<ShowcaseBentoProps> = ({ onSelectItem, items }) => {
  // Find key items matching the user's photos
  const cortadoItem = items.find((i) => i.id === 'kaffi-cortado') || items[0];
  const croissantItem = items.find((i) => i.id === 'croissant-scrambled-egg') || items[1];
  const dessertTubItem = items.find((i) => i.id === 'dessert-tub-chocolate-praline') || items[2];
  const celebrationCakeItem = items.find((i) => i.id === 'cake-belgian-truffle') || items[3];

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#F7F3EA] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C5A3C] mb-2">
            The 100 Miles Experience
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F1510] tracking-tight">
            Crafted with Passion. Served with Warmth.
          </h2>
          <p className="mt-3 text-sm text-[#665448]">
            Explore our most celebrated signatures, captured fresh from our bakery ovens and espresso bar.
          </p>
        </div>

        {/* 4-Item Visual Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Scrambled Egg Croissant (Large Feature, 7 cols) */}
          <div
            onClick={() => onSelectItem(croissantItem)}
            className="group md:col-span-7 bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2D1E17]">
              <img
                src={croissantItem.image}
                alt="Scrambled Egg & Herb Croissant with cozy fireplace glow"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#140D0A]/80 backdrop-blur-md text-[#F3E5D4] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>Signature Breakfast Bake</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-[#D8AF3B] text-[#140D0A] font-bold text-sm px-3 py-1.5 rounded-lg shadow font-mono tabular-nums">
                ₹{croissantItem.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1F1510] group-hover:text-[#8C5A3C] transition-colors">
                    {croissantItem.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#6B5A4E] line-clamp-2">
                    Flaky, buttery French laminated croissant filled with soft scrambled eggs and fresh greens, served alongside our signature cozy fireplace glow.
                  </p>
                </div>
                <button
                  className="shrink-0 p-3 bg-[#1F1510] text-white rounded-full group-hover:bg-[#C59B27] group-hover:text-[#140D0A] transition-colors"
                  aria-label="Order Croissant"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Specialty Cortado (5 cols) */}
          <div
            onClick={() => onSelectItem(cortadoItem)}
            className="group md:col-span-5 bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#2D1E17]">
              <img
                src={cortadoItem.image}
                alt="Artisan Cortado in Glass with Heart Latte Art on Wooden Tray"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#140D0A]/80 backdrop-blur-md text-[#F3E5D4] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#E74C3C]" />
                <span>Heart Latte Art</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-[#D8AF3B] text-[#140D0A] font-bold text-sm px-3 py-1.5 rounded-lg shadow font-mono tabular-nums">
                ₹{cortadoItem.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1F1510] group-hover:text-[#8C5A3C] transition-colors">
                    {cortadoItem.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B5A4E]">
                    Served on a custom carved walnut wooden tray with a silver spoon and craft paper napkin.
                  </p>
                </div>
                <button
                  className="shrink-0 p-3 bg-[#1F1510] text-white rounded-full group-hover:bg-[#C59B27] group-hover:text-[#140D0A] transition-colors"
                  aria-label="Order Cortado"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Layered Dessert Tub (6 cols) */}
          <div
            onClick={() => onSelectItem(dessertTubItem)}
            className="group md:col-span-6 bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2D1E17]">
              <img
                src={dessertTubItem.image}
                alt="Layered Chocolate & Hazelnut Praline Dessert Tub"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#140D0A]/80 backdrop-blur-md text-[#F3E5D4] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D8AF3B]" />
                <span>Viral Dessert Box</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-[#D8AF3B] text-[#140D0A] font-bold text-sm px-3 py-1.5 rounded-lg shadow font-mono tabular-nums">
                ₹{dessertTubItem.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1F1510] group-hover:text-[#8C5A3C] transition-colors">
                    {dessertTubItem.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B5A4E]">
                    Decadent chocolate layers, whipped mascarpone, and caramelized hazelnut praline flakes in a clear takeaway tub.
                  </p>
                </div>
                <button
                  className="shrink-0 p-3 bg-[#1F1510] text-white rounded-full group-hover:bg-[#C59B27] group-hover:text-[#140D0A] transition-colors"
                  aria-label="Order Dessert Tub"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Celebration Cake (6 cols) */}
          <div
            onClick={() => onSelectItem(celebrationCakeItem)}
            className="group md:col-span-6 bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2D1E17]">
              <img
                src={celebrationCakeItem.image}
                alt="Belgian Truffle Ganache Celebration Cake"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#140D0A]/80 backdrop-blur-md text-[#F3E5D4] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D8AF3B]" />
                <span>Cake Shop Special</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-[#D8AF3B] text-[#140D0A] font-bold text-sm px-3 py-1.5 rounded-lg shadow font-mono tabular-nums">
                Starting ₹{celebrationCakeItem.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1F1510] group-hover:text-[#8C5A3C] transition-colors">
                    {celebrationCakeItem.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B5A4E]">
                    Handcrafted celebration cakes for birthdays, anniversaries, and milestones with custom message piping.
                  </p>
                </div>
                <button
                  className="shrink-0 p-3 bg-[#1F1510] text-white rounded-full group-hover:bg-[#C59B27] group-hover:text-[#140D0A] transition-colors"
                  aria-label="Order Celebration Cake"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
