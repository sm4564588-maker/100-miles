import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShowcaseBento } from './components/ShowcaseBento';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CustomCakeModal } from './components/CustomCakeModal';
import { ReservationModal } from './components/ReservationModal';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';

import { MenuItem, CartItem, CartItemOption, OrderDetails, Review } from './types';
import { MENU_ITEMS, REVIEWS } from './data/menuData';

export default function App() {
  const [items] = useState<MenuItem[]>(MENU_ITEMS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  // Modals state
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    options: CartItemOption,
    quantity: number,
    finalUnitPrice: number
  ) => {
    const cartItemId = `${item.id}-${JSON.stringify(options)}`;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.id === cartItemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedOptions: options,
          finalPrice: finalUnitPrice,
        },
      ];
    });

    showToast(`Added ${quantity}x ${item.name} to your bag`);
  };

  // Cart actions
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    setConfirmedOrder(order);
  };

  const handleAddReview = (newRev: Review) => {
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review was shared.');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#221713] flex flex-col font-sans selection:bg-[#EBDDCF] selection:text-[#1F1510]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1510] text-[#FDFBF7] px-4 py-3 rounded-xl shadow-xl border border-[#3A2920] text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#D8AF3B]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header conforming to Top Bar Contract */}
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => {
            const menuEl = document.getElementById('menu');
            menuEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomCake={() => setIsCustomCakeOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Bento Showcase highlighting the 4 real photos & signatures */}
        <ShowcaseBento
          items={items}
          onSelectItem={(item) => setCustomizerItem(item)}
        />

        {/* Customer Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Location, Google Directions, and Operating Hours */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCustomCake={() => setIsCustomCakeOpen(true)}
      />

      {/* Modals & Drawers */}
      <ItemCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <CustomCakeModal
        isOpen={isCustomCakeOpen}
        onClose={() => setIsCustomCakeOpen(false)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}

