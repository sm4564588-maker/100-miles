import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Share2,
  Bookmark,
  ExternalLink,
  Check,
  Calendar,
  Car,
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const LocationHoursSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '100 Miles Kaffi & Bakes',
          text: 'Check out 100 Miles Kaffi & Bakes at Udham Singh Chowk, Malwal Road, Firozpur!',
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <section id="location-hours" className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C5A3C] mb-2">
            <span>Find Us in Firozpur</span>
            <span>·</span>
            <span>9 mins Travel Time</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1510] tracking-tight">
            Visit Our Bakery & Coffeehouse
          </h2>
          <p className="mt-2 text-sm text-[#665448] max-w-xl">
            Located right at Udham Singh Chowk on Malwal Road. Easy parking, cozy seating, and welcoming aromas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Card & Essential Google Listing Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#EDE5D5] p-6 sm:p-8 shadow-xs space-y-6">
              {/* Quick Google Action Row */}
              <div className="grid grid-cols-4 gap-2 pb-6 border-b border-[#F2ECE1]">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] text-[#1F1510] transition-colors text-center"
                >
                  <Navigation className="w-5 h-5 text-[#C59B27] mb-1.5" />
                  <span className="text-[11px] font-semibold">Directions</span>
                </a>

                <a
                  href={`tel:${CAFE_INFO.phoneDial}`}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] text-[#1F1510] transition-colors text-center"
                >
                  <Phone className="w-5 h-5 text-[#C59B27] mb-1.5" />
                  <span className="text-[11px] font-semibold">Call Cafe</span>
                </a>

                <button
                  onClick={handleSave}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] text-[#1F1510] transition-colors text-center"
                >
                  <Bookmark
                    className={`w-5 h-5 mb-1.5 ${
                      saved ? 'fill-[#C59B27] text-[#C59B27]' : 'text-[#C59B27]'
                    }`}
                  />
                  <span className="text-[11px] font-semibold">{saved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2EAE0] text-[#1F1510] transition-colors text-center"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600 mb-1.5" />
                  ) : (
                    <Share2 className="w-5 h-5 text-[#C59B27] mb-1.5" />
                  )}
                  <span className="text-[11px] font-semibold">{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Address details */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1F1510] block text-sm">
                      Address
                    </span>
                    <p className="text-[#554338] mt-0.5 leading-relaxed">
                      {CAFE_INFO.address}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[#8C5A3C]">
                      <Car className="w-3.5 h-3.5" />
                      <span>Approx. 9 mins drive from Firozpur Cantt Railway Station</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#F2ECE1]">
                  <Phone className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1F1510] block text-sm">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${CAFE_INFO.phoneDial}`}
                      className="text-[#554338] hover:text-[#C59B27] font-mono tabular-nums text-sm font-semibold transition-colors mt-0.5 block"
                    >
                      {CAFE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#F2ECE1]">
                  <Clock className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1F1510] text-sm">
                        Operating Hours
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Open Now · Closes 11 PM
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-[#6B5A4E]">
                      <div className="flex justify-between py-1 border-b border-[#F5EFE7]">
                        <span>Monday – Sunday</span>
                        <span className="font-mono tabular-nums font-medium text-[#1F1510]">
                          8:30 AM – 11:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Kitchen & Bakery Counter</span>
                        <span className="font-mono tabular-nums font-medium text-[#1F1510]">
                          Fresh batches all day
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ownership / Suggestion tag */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#8C7A6E]">
                <span>Own this business? Claim or suggest edits</span>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#8C5A3C] hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Card with Street View / Route */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#EDE5D5] overflow-hidden shadow-xs">
              {/* Map Preview Header */}
              <div className="p-4 bg-[#FAF6EE] border-b border-[#EDE5D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C59B27]" />
                  <span className="font-serif text-sm font-bold text-[#1F1510]">
                    Udham Singh Chowk, Malwal Road
                  </span>
                </div>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8C5A3C] hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Interactive Map View */}
              <div className="relative aspect-[16/11] bg-[#E8E1D5] overflow-hidden">
                <iframe
                  title="100 Miles Kaffi & Bakes Location Map"
                  src="https://maps.google.com/maps?q=100+miles+kaffi+%26+bakes+udham+singh+chowk+malwal+road+firozpur+punjab+152002&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter saturate-90 contrast-105"
                  loading="lazy"
                />
              </div>

              {/* Landmark notes */}
              <div className="p-5 text-xs text-[#554338] bg-[#FAF6EE] space-y-2">
                <div className="font-semibold text-[#1F1510]">Prominent Landmarks & Access:</div>
                <p className="leading-relaxed">
                  Situated right at the prominent Udham Singh Chowk on Malwal Road. Convenient two-wheeler & car curbside parking available. Ample indoor air-conditioned seating with cozy fireplace corner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
