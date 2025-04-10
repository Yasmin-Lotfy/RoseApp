"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchModalContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined);

export const SearchModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <SearchModalContext.Provider value={{ isSearchOpen, openSearch, closeSearch }}>
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within a SearchModalProvider");
  }
  return context;
};