import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, CartItemOption } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CartItemOption, quantity: number, finalPrice: number) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<CartItemOption['milk']>('Whole Milk');
  const [selectedTemp, setSelectedTemp] = useState<CartItemOption['temperature']>('Hot');
  const [selectedSweetness, setSelectedSweetness] = useState<CartItemOption['sweetness']>('Regular');
  const [selectedHeating, setSelectedHeating] = useState<CartItemOption['heating']>('Warmed');
  const [cakeSize, setCakeSize] = useState<CartItemOption['cakeSize']>('500g');
  const [customPiping, setCustomPiping] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate pricing based on options
  let unitPrice = item.price;
  if (item.category === 'coffee') {
    if (selectedMilk === 'Oat Milk (+₹40)') unitPrice += 40;
    if (selectedMilk === 'Almond Milk (+₹50)') unitPrice += 50;
    if (selectedTemp === 'Iced (+₹20)') unitPrice += 20;
  }
  if (item.category === 'cakes') {
    if (cakeSize === '1 Kg') unitPrice = Math.round(item.price * 1.85);
    if (cakeSize === '1.5 Kg') unitPrice = Math.round(item.price * 2.7);
    if (cakeSize === '2 Kg') unitPrice = Math.round(item.price * 3.5);
  }

  const finalTotal = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      {
        milk: item.options?.milk ? selectedMilk : undefined,
        temperature: item.options?.temperature ? selectedTemp : undefined,
        sweetness: item.options?.sweetness ? selectedSweetness : undefined,
        heating: item.options?.heating ? selectedHeating : undefined,
        cakeSize: item.options?.cakeSize ? cakeSize : undefined,
        customPiping: customPiping.trim() ? customPiping.trim() : undefined,
        specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
      },
      quantity,
      unitPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EDE5D5] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-[#20140E] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-[#E5C07B] mb-1">
              <span>{item.isVeg ? '🟢 Pure Veg' : '🔴 Contains Egg'}</span>
              <span>·</span>
              <span>{item.prepTime || 'Freshly made'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">{item.name}</h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#2D1E17]">
          <p className="text-sm text-[#665448] leading-relaxed">{item.description}</p>

          {/* Coffee Options: Milk */}
          {item.options?.milk && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Choice of Milk
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Whole Milk', 'Oat Milk (+₹40)', 'Almond Milk (+₹50)'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMilk(m)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                      selectedMilk === m
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Temperature Option */}
          {item.options?.temperature && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hot', 'Iced (+₹20)'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTemp(t)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                      selectedTemp === t
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.options?.sweetness && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Sweetness Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['No Sugar', 'Less Sweet', 'Regular'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSweetness(s)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                      selectedSweetness === s
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Croissant Heating */}
          {item.options?.heating && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Bakery Warmth
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Warmed', 'Extra Crispy', 'Standard'] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHeating(h)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                      selectedHeating === h
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cake Weight Size */}
          {item.options?.cakeSize && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Cake Weight / Servings
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['500g', '1 Kg', '1.5 Kg', '2 Kg'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setCakeSize(size)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                      cakeSize === size
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                  Custom Cake Message (Piped on chocolate plaque)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday Simran!"
                  value={customPiping}
                  onChange={(e) => setCustomPiping(e.target.value)}
                  maxLength={40}
                  className="w-full text-xs px-3 py-2 border border-[#D5C9B8] rounded-lg bg-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>
            </div>
          )}

          {/* Special notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
              Barista / Baker Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, no cutlery, birthday candle requested"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#D5C9B8] rounded-lg bg-white focus:outline-none focus:border-[#C59B27]"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 sm:p-5 bg-[#FAF6EE] border-t border-[#EDE5D5] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center border border-[#D5C9B8] rounded-lg bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-[#F3ECE1] text-[#2D1E17] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-mono text-sm font-semibold text-[#1F1510] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-[#F3ECE1] text-[#2D1E17] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1F1510] hover:bg-[#34231A] rounded-lg transition-all shadow active:scale-[0.98]"
          >
            <span>Add to Order Bag</span>
            <span className="font-mono tabular-nums text-[#D8AF3B] font-bold">
              ₹{finalTotal}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
