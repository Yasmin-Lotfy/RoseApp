"use client";

import { createContext, useContext, useState } from "react";

interface AuthModalContextProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isForgotPasswordOpen: boolean;
  isVerifyModalOpen: boolean;
  isResetPasswordOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openRegister: () => void;
  closeRegister: () => void;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
  openVerifyModal: () => void;
  closeVerifyModal: () => void;
  openResetPassword: () => void;
  closeResetPassword: () => void;
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
    setIsVerifyModalOpen(false);
    setIsResetPasswordOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(false);
    setIsVerifyModalOpen(false);
    setIsResetPasswordOpen(false);
  };

  const closeRegister = () => setIsRegisterOpen(false);

  const openForgotPassword = () => {
    setIsForgotPasswordOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsVerifyModalOpen(false);
    setIsResetPasswordOpen(false);
  };

  const closeForgotPassword = () => setIsForgotPasswordOpen(false);

  const openVerifyModal = () => {
    setIsVerifyModalOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
    setIsResetPasswordOpen(false);
  };

  const closeVerifyModal = () => setIsVerifyModalOpen(false);

  const openResetPassword = () => {
    setIsResetPasswordOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
    setIsVerifyModalOpen(false);
  };

  const closeResetPassword = () => setIsResetPasswordOpen(false);
  


  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        isVerifyModalOpen,
        isResetPasswordOpen,
        openLogin,
        closeLogin,
        openRegister,
        closeRegister,
        openForgotPassword,
        closeForgotPassword,
        openVerifyModal,
        closeVerifyModal,
        openResetPassword,
        closeResetPassword,
       
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
