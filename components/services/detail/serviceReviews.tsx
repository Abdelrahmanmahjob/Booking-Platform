"use client";

import { motion } from "framer-motion";

// interface ServiceReviewsProps {
//   serviceId: string;
// }

const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Sarah Johnson",
    rating: 5,
    comment:
      "Excellent service! Dr. Hassan was very professional and thorough. Highly recommend!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "2",
    author: "Mike Chen",
    rating: 4,
    comment:
      "Great experience overall. The consultation was detailed and I got all my questions answered.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "3",
    author: "Emily Davis",
    rating: 5,
    comment:
      "Very satisfied with the service. Professional, punctual, and caring. Will book again!",
    date: "2 weeks ago",
    verified: false,
  },
];

export function ServiceReviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Customer Reviews
          </h2>
          <p className="text-muted-foreground">
            {MOCK_REVIEWS.length} reviews • Average 4.8/5
          </p>
        </div>

        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">4.8</div>
          <div className="flex text-yellow-500 text-lg mb-1">⭐⭐⭐⭐⭐</div>
          <div className="text-sm text-muted-foreground">
            {MOCK_REVIEWS.length} reviews
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = MOCK_REVIEWS.filter((r) => r.rating === stars).length;
          const percentage = (count / MOCK_REVIEWS.length) * 100;

          return (
            <div key={stars} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{stars}★</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-yellow-500 h-2 rounded-full"
                />
              </div>
              <span className="text-muted-foreground w-6">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {MOCK_REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="border-b border-border last:border-b-0 pb-6 last:pb-0"
          >
            {/* Review Header */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {review.author.charAt(0)}
                  </span>
                </div>

                {/* Author Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {review.date}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </div>
            </div>

            {/* Review Comment */}
            <p className="text-muted-foreground leading-relaxed">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button
          className="
          px-6 py-3
          border-2 border-border hover:border-primary/40
          text-foreground hover:bg-accent
          rounded-xl font-medium
          transition-all duration-200
        "
        >
          Load More Reviews
        </button>
      </div>
    </motion.div>
  );
}
