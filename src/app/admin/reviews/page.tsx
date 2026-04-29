"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  MessageSquare, 
  Check, 
  X, 
  Search,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminFetch } from "@/lib/admin-fetch";

interface Review {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
}

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  useEffect(() => {
    adminFetch("/api/reviews")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("REMOVE THIS FEEDBACK?")) {
      try {
        const res = await adminFetch(`/api/reviews?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setReviews(prev => prev.filter(r => r.id !== id));
        } else {
          alert("Failed to delete from database");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const processedReviews = Array.isArray(reviews) 
    ? [...reviews]
        .filter(r => 
          r.user?.toLowerCase().includes(search.toLowerCase()) || 
          r.content?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
          if (sortBy === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } else {
            return b.rating - a.rating;
          }
        })
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black uppercase tracking-tighter italic">Customer Reviews</h1>
        <p className="text-black/60 font-bold uppercase tracking-widest mt-2">Check and manage customer feedback</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40" />
          <input 
            type="text"
            placeholder="FILTER REVIEWS BY KEYWORD..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 border-[4px] border-black rounded-none font-black uppercase tracking-widest focus:outline-none focus:bg-black/5"
          />
        </div>
        <button 
          onClick={() => setSortBy(sortBy === "date" ? "rating" : "date")}
          className="flex items-center space-x-3 px-6 border-[4px] border-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-widest text-xs"
        >
          <Filter className="w-5 h-5" />
          <span>Sort: {sortBy === "date" ? "Newest" : "Top Rated"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-20 text-center font-black uppercase">Loading reviews...</div>
        ) : (
          <AnimatePresence>
            {processedReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="flex flex-col items-center space-y-2 min-w-[120px]">
                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center border-[2px] border-black">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <span className="font-black uppercase text-xs tracking-tighter">{review.user}</span>
                  <span className="text-[10px] font-bold text-black/40 uppercase">{review.date}</span>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? "fill-black text-black" : "text-black/20"}`} 
                      />
                    ))}
                  </div>
                  <p className="font-bold text-lg leading-tight uppercase italic tracking-tight">
                    {review.content}
                  </p>
                </div>

                <div className="flex md:flex-col gap-2">
                  <button className="p-3 border-[2px] border-black bg-black text-white hover:bg-white hover:text-black transition-all">
                    <Check className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="p-3 border-[2px] border-black text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
