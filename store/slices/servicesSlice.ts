import { ServiceCategory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ============================================
// STATE INTERFACE
// ============================================

interface ServicesState {
  filters: {
    category: ServiceCategory | "all";
    searchQuery: string;
  };
}

// ============================================
// INITIAL STATE
// ============================================

const initialState: ServicesState = {
  filters: {
    category: "all",
    searchQuery: "",
  },
};

// ============================================
// SLICE
// ============================================

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ServiceCategory | "all">) => {
      state.filters.category = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setCategory, setSearchQuery, resetFilters } =
  servicesSlice.actions;
export default servicesSlice.reducer;

// ============================================
// SELECTORS
// ============================================

import type { RootState } from "@/store";

export const selectFilters = (state: RootState) => state.services.filters;
export const selectCategory = (state: RootState) =>
  state.services.filters.category;
export const selectSearchQuery = (state: RootState) =>
  state.services.filters.searchQuery;
