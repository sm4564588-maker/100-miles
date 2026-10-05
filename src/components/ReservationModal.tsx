import React, { useState } from 'react';
import { X, Flame, Calendar, Clock, Users, Check, Phone } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [seatingArea, setSeatingArea] = useState('Fireplace Corner');
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const message = `*TABLE RESERVATION - 100 Miles Kaffi & Bakes*\nName: ${name}\nPhone: ${phone}\nParty Size: ${guests}\nArea: ${seatingArea}\nDate & Time: ${date || 'Today'} at ${time}\nNotes: ${notes || 'None'}`;

    const waUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setReserved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EDE5D5] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#1F1510] text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#C4B7AC] hover:text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D8AF3B] mb-1">
            <Flame className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>Cozy Café Ambiance</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">Reserve a Table</h3>
          <p className="text-xs text-[#C4B7AC] mt-1">
            Enjoy our signature coffee and bakery creations by the fireplace or in a quiet booth.
          </p>
        </div>

        {reserved ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#1F1510]">
              Reservation Request Sent!
            </h4>
            <p className="text-sm text-[#665448] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#1F1510]">{name}</span>! We have received your reservation request for{' '}
              <span className="font-semibold">{guests}</span> in the <span className="font-semibold">{seatingArea}</span>.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1F1510] text-white text-xs font-semibold rounded-lg hover:bg-[#33221A]"
              >
                Back to Café
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-[#2D1E17]">
            {/* Preferred Seating */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Preferred Seating Area
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Fireplace Corner', 'Window Booth', 'Main Café Lounge'].map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setSeatingArea(area)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      seatingArea === area
                        ? 'border-[#C59B27] bg-[#FAF4E6] text-[#1F1510] font-semibold'
                        : 'border-[#E0D7C7] hover:border-[#8C5A3C] text-[#554338]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-2">
                Party Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['1-2 Guests', '3-4 Guests', '5-6 Guests', '7+ Group'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGuests(g)}
                    className={`py-2 text-xs rounded border transition-colors ${
                      guests === g
                        ? 'border-[#C59B27] bg-[#FAF4E6] font-semibold text-[#1F1510]'
                        : 'border-[#D5C9B8] bg-white text-[#554338]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                  Preferred Time (Open until 11 PM)
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EDE5D5]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Aggarwal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9807900087"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C5A3C] mb-1">
                Special Occasion or Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, high chair needed, quiet work meeting"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#1F1510] hover:bg-[#34231A] rounded-lg transition-all shadow"
              >
                <span>Confirm & Send Reservation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
