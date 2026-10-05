import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageCircle, X, Sparkles } from 'lucide-react';
import { OrderDetails } from '../types';
import { CAFE_INFO } from '../data/menuData';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const waShareText = `Hi 100 Miles Kaffi & Bakes, I just placed Order #${order.orderId} for ₹${order.total}. Could you please confirm the prep status?`;
  const waUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(waShareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EDE5D5] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#1F1510] text-white text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#C4B7AC] hover:text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-white">Order Confirmed!</h3>
          <p className="text-xs text-[#D8AF3B] mt-1 font-mono tracking-wider">
            ORDER ID: #{order.orderId}
          </p>
        </div>

        {/* Live Prep Status Bar */}
        <div className="bg-[#FAF4E6] px-6 py-4 border-b border-[#E8DEC9] shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F1510] mb-2">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Barista & Oven Preparing
            </span>
            <span className="font-mono text-[#8C5A3C]">
              Est: 15–20 mins
            </span>
          </div>

          {/* Stepper bar */}
          <div className="w-full bg-[#E3D9C9] h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#C59B27] h-full w-2/3 transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#7A6B63] mt-1">
            <span>Received</span>
            <span className="font-semibold text-[#1F1510]">Brewing & Baking</span>
            <span>Ready</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#2D1E17]">
          {/* Order Details summary */}
          <div className="bg-white p-4 rounded-xl border border-[#EDE5D5] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#7A6B63]">Customer:</span>
              <span className="font-semibold">{order.customerName} ({order.phone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6B63]">Type:</span>
              <span className="font-semibold capitalize text-[#8C5A3C]">
                {order.orderType === 'pickup'
                  ? 'Store Counter Pickup'
                  : order.orderType === 'dinein'
                  ? `Dine-In (${order.tableNumber})`
                  : 'Firozpur City Delivery'}
              </span>
            </div>
            {order.address && (
              <div className="flex justify-between">
                <span className="text-[#7A6B63]">Delivery Address:</span>
                <span className="font-semibold max-w-[60%] text-right">{order.address}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#7A6B63]">Payment:</span>
              <span className="font-semibold uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Itemized summary */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
              Items Ordered
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-[#F2ECE1]"
                >
                  <div>
                    <span className="font-semibold text-[#1F1510]">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    {item.selectedOptions.customPiping && (
                      <div className="text-[10px] italic text-[#8C5A3C]">
                        "{item.selectedOptions.customPiping}"
                      </div>
                    )}
                  </div>
                  <span className="font-mono tabular-nums font-semibold">
                    ₹{item.finalPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 flex justify-between text-sm font-bold text-[#1F1510]">
              <span>Total Paid / Due</span>
              <span className="font-mono tabular-nums text-base text-[#C59B27]">
                ₹{order.total}
              </span>
            </div>
          </div>

          {/* Quick Pickup instruction */}
          <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#EDE5D5] flex items-start gap-3 text-xs text-[#554338]">
            <MapPin className="w-4 h-4 text-[#8C5A3C] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#1F1510]">
                {CAFE_INFO.name}
              </p>
              <p className="text-[11px] text-[#7A6B63] mt-0.5">
                {CAFE_INFO.address} · Phone: {CAFE_INFO.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#FAF6EE] border-t border-[#EDE5D5] flex flex-col sm:flex-row items-center gap-2 shrink-0">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-3 text-xs font-semibold text-center text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Updates on WhatsApp</span>
          </a>

          <a
            href={`tel:${CAFE_INFO.phoneDial}`}
            className="w-full sm:flex-1 py-2.5 px-3 text-xs font-semibold text-center text-white bg-[#1F1510] hover:bg-[#34231A] rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#D8AF3B]" />
            <span>Call 100 Miles ({CAFE_INFO.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
