import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { CAFE_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'pickup' | 'dinein' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'cod' | 'upi'>('counter');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 500 ? 0 : 40) : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (viaWhatsApp: boolean = false) => {
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }
    if (orderType === 'dinein' && !tableNumber.trim()) {
      setErrorMsg('Please enter your table or booth number');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your delivery address in Firozpur');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    const orderId = `100M-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderData: OrderDetails = {
      orderId,
      orderType,
      customerName,
      phone,
      tableNumber: orderType === 'dinein' ? tableNumber : undefined,
      address: orderType === 'delivery' ? address : undefined,
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (viaWhatsApp) {
      // Build WhatsApp message
      const itemsListText = items
        .map(
          (i) =>
            `• ${i.quantity}x ${i.menuItem.name} (₹${i.finalPrice * i.quantity})${
              i.selectedOptions.milk ? ` [${i.selectedOptions.milk}]` : ''
            }${i.selectedOptions.customPiping ? ` [Message: ${i.selectedOptions.customPiping}]` : ''}`
        )
        .join('\n');

      const message = `*NEW ORDER from 100 Miles Kaffi & Bakes Web*\nOrder ID: #${orderId}\nType: ${orderType.toUpperCase()}\nCustomer: ${customerName}\nPhone: ${phone}\n${
        orderType === 'dinein' ? `Table: ${tableNumber}\n` : ''
      }${orderType === 'delivery' ? `Delivery Address: ${address}\n` : ''}\n*Items:*\n${itemsListText}\n\n*Total Amount:* ₹${total}\nPayment: ${paymentMethod.toUpperCase()}`;

      const waUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }

    setTimeout(() => {
      setSubmitting(false);
      onOrderPlaced(orderData);
      onClearCart();
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#EDE5D5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-[#1F1510] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D8AF3B]" />
              <h2 className="font-serif text-lg font-bold">Your Order Bag</h2>
              <span className="text-xs text-[#D8AF3B] font-mono tabular-nums">
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#C4B7AC] hover:text-white rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment selector */}
          <div className="p-3 bg-[#FAF6EE] border-b border-[#EDE5D5] shrink-0">
            <div className="grid grid-cols-3 gap-1 bg-[#ECE3D5] p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 font-medium rounded-md transition-all ${
                  orderType === 'pickup'
                    ? 'bg-white text-[#1F1510] font-semibold shadow-xs'
                    : 'text-[#6B5A4E] hover:text-[#1F1510]'
                }`}
              >
                Store Pickup
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dinein')}
                className={`py-1.5 font-medium rounded-md transition-all ${
                  orderType === 'dinein'
                    ? 'bg-white text-[#1F1510] font-semibold shadow-xs'
                    : 'text-[#6B5A4E] hover:text-[#1F1510]'
                }`}
              >
                Dine-In
              </button>
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 font-medium rounded-md transition-all ${
                  orderType === 'delivery'
                    ? 'bg-white text-[#1F1510] font-semibold shadow-xs'
                    : 'text-[#6B5A4E] hover:text-[#1F1510]'
                }`}
              >
                Firozpur Delivery
              </button>
            </div>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-[#7A6B63]">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-[#C4B7AC] mb-3" />
                <p className="font-serif text-lg font-semibold text-[#2D1E17]">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#8C7A6E] mt-1">
                  Add specialty kaffi, flaky croissants, or dessert tubs to begin.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-[#EDE5D5] shadow-xs"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#221611] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#1F1510] truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#A8988C] hover:text-red-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Options summary */}
                    <div className="text-[11px] text-[#7A6B63] space-y-0.5 mt-0.5">
                      {item.selectedOptions.milk && <div>Milk: {item.selectedOptions.milk}</div>}
                      {item.selectedOptions.temperature && (
                        <div>Temp: {item.selectedOptions.temperature}</div>
                      )}
                      {item.selectedOptions.cakeSize && (
                        <div>Size: {item.selectedOptions.cakeSize}</div>
                      )}
                      {item.selectedOptions.customPiping && (
                        <div className="italic text-[#8C5A3C]">
                          Piping: "{item.selectedOptions.customPiping}"
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1F1510] tabular-nums">
                        ₹{item.finalPrice * item.quantity}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-[#DCD1BF] rounded-md bg-[#FAF6EE]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#554338] hover:text-black"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 text-xs font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#554338] hover:text-black"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Customer Information inputs when items exist */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-[#EDE5D5] space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C5A3C]">
                  {orderType === 'pickup'
                    ? 'Pickup Contact Info'
                    : orderType === 'dinein'
                    ? 'Dine-In Details'
                    : 'Delivery Address & Phone'}
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#554338] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Aggarwal"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#554338] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9807900087"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                {orderType === 'dinein' && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#554338] mb-1">
                      Table / Booth Number (or "Fireplace Corner") *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4 or Fireplace 2"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#554338] mb-1">
                      Delivery Address in Firozpur *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House / Flat no., Landmark, Area in Firozpur"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                )}

                {/* Payment Option */}
                <div>
                  <label className="block text-[11px] font-medium text-[#554338] mb-1">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('counter')}
                      className={`p-1.5 text-center rounded border transition-colors ${
                        paymentMethod === 'counter'
                          ? 'border-[#C59B27] bg-[#FAF4E6] font-semibold text-[#1F1510]'
                          : 'border-[#D5C9B8] bg-white text-[#554338]'
                      }`}
                    >
                      Pay at Counter
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-1.5 text-center rounded border transition-colors ${
                        paymentMethod === 'upi'
                          ? 'border-[#C59B27] bg-[#FAF4E6] font-semibold text-[#1F1510]'
                          : 'border-[#D5C9B8] bg-white text-[#554338]'
                      }`}
                    >
                      UPI / QR Scan
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-1.5 text-center rounded border transition-colors ${
                        paymentMethod === 'cod'
                          ? 'border-[#C59B27] bg-[#FAF4E6] font-semibold text-[#1F1510]'
                          : 'border-[#D5C9B8] bg-white text-[#554338]'
                      }`}
                    >
                      Cash / Card
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    {errorMsg}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FAF6EE] border-t border-[#EDE5D5] space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-[#554338]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₹{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Firozpur City Delivery</span>
                    <span className="font-mono tabular-nums">
                      {deliveryFee === 0 ? 'FREE (Above ₹500)' : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E3D9C9] flex justify-between text-sm font-bold text-[#1F1510]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-base text-[#C59B27]">
                    ₹{total}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handlePlaceOrder(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#1F1510] hover:bg-[#34231A] active:scale-[0.98] rounded-lg transition-all shadow"
                >
                  <span>{submitting ? 'Placing Order...' : 'Confirm Instant Order'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D8AF3B]" />
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handlePlaceOrder(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Send Order to Café on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
