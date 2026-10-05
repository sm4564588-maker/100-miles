import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, Quote, ThumbsUp, X } from 'lucide-react';
import { Review } from '../types';
import { CAFE_INFO } from '../data/menuData';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating,
      timeAgo: 'Just now',
      text: reviewText.trim(),
      verified: true,
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmitted(false);
      setReviewerName('');
      setReviewText('');
      setRating(5);
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6EE] border-b border-[#EDE5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C5A3C] mb-2">
              <span>Google Verified Reviews</span>
              <span>·</span>
              <span>4.04 Star Rating</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1510] tracking-tight">
              Loved by Coffee & Bake Enthusiasts
            </h2>
            <p className="mt-2 text-sm text-[#665448] max-w-xl">
              Authentic customer testimonials from our Google Maps community in Firozpur, Punjab.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-3 rounded-xl border border-[#EDE5D5] shadow-xs flex items-center gap-3">
              <div className="font-serif text-3xl font-bold text-[#1F1510] font-mono tabular-nums">
                {CAFE_INFO.rating}
              </div>
              <div>
                <div className="flex items-center text-[#D8AF3B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D8AF3B]" />
                  ))}
                </div>
                <div className="text-[11px] text-[#7A6B63] mt-0.5">
                  Over 150+ reviews
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#1F1510] hover:bg-[#34231A] rounded-xl transition-all shadow-xs"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#D8AF3B]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#EDE5D5] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#D8AF3B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D8AF3B]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7A6E]">{rev.timeAgo}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1F1510]">{rev.author}</h4>
                  <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>Google Local Guide</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#8C7A6E]">Firozpur</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#EDE5D5] p-6 text-[#2D1E17]">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#8C7A6E] hover:text-[#1F1510] rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold">Thank you for your review!</h4>
                <p className="text-xs text-[#6B5A4E]">
                  Your review has been recorded for 100 Miles Kaffi & Bakes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold">Rate 100 Miles Kaffi & Bakes</h3>
                  <p className="text-xs text-[#7A6B63] mt-1">
                    Share your experience with our coffee, croissants, cakes, and fireplace ambience.
                  </p>
                </div>

                {/* Rating Stars Picker */}
                <div>
                  <label className="block text-xs font-semibold text-[#554338] mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-[#D8AF3B] text-[#D8AF3B]'
                              : 'text-[#DCD1BF]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold ml-2 text-[#1F1510]">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#554338] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navjot Singh"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#554338] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what you ordered, the taste, ambience, or staff..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#1F1510] hover:bg-[#34231A] rounded-lg transition-colors shadow"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
