"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectSearchQuery,
  setSearchQuery,
} from "@/store/slices/servicesSlice";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { motion } from "framer-motion";

export function ServicesSearch() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    dispatch(setSearchQuery(value));
  }, 300);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search services, providers..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleDebouncedSearch(e.target.value);
        }}
        className="
          w-full pl-12 pr-4 py-3.5
          bg-card border-2 border-border
          hover:border-primary/40
          focus:border-primary focus:ring-4 focus:ring-primary/10
          rounded-xl text-foreground
          placeholder:text-muted-foreground
          transition-all duration-200
          focus:outline-none
          shadow-sm
        "
      />

      {/* Clear Button */}
      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            dispatch(setSearchQuery(""));
          }}
          className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
