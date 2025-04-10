"use client";
import { createContext, useContext, useState } from "react";

const LoginModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LoginModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => useContext(LoginModalContext);
