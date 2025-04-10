"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createPortal } from "react-dom";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { useTranslations } from "next-intl";

//  Validate login input with Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginModal() {
  const { isLoginOpen, closeLogin, openRegister, openForgotPassword } = useAuthModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFields) => {
    console.log("🔹 Sending login request with:", values);
  
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email, 
        password: values.password,
      });
  
      console.log("Login Response:", response);
  
      if (response?.error) {
        toast.error(t("loginFailed"), { position: "top-right" });
      } else {
        toast.success(t("loginSuccess"), { position: "top-right" });
        closeLogin();
        
        // Get the callbackUrl from the query string or use the default URL
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || "/en";
        
        // Redirect to the callbackUrl after login
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(t("loginFailed"), { position: "top-right" });
    }
  
    setLoading(false);
  };

  //  Fix Hydration Issue: Only use `createPortal` in the browser
  if (typeof window !== "undefined") {
    return createPortal(
      <Dialog open={isLoginOpen} onOpenChange={closeLogin}>
        {/*  Dark Overlay */}
        {isLoginOpen && <div className="fixed inset-0 bg-black/50 z-[999]" />}

        {/*  Toast Notifications */}
        <ToastContainer className="z-[1100]" />

        {/*  Modal Content */}
        <DialogContent className="fixed z-[1000] w-full max-w-md bg-white sm:rounded-[20px] rounded-[20px] p-6 shadow-lg border border-black/10">
          <h2 className="text-[30px] font-[400] text-black text-start">
            {t("login")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            {/*  Email Input */}
            <div>
              <Input
                type="email"
                placeholder={t("email")}
                {...register("email")}
                className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/*  Password Input */}
            <div>
              <Input
                type="password"
                placeholder={t("password")}
                {...register("password")}
                className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/*  Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-gray-600">
                  {t("rememberMe")}
                </label>
              </div>
              <button
                type="button"
                className="text-custom-pink font-[600] text-[14px] hover:underline"
                onClick={() => {
                  closeLogin();
                  openForgotPassword();
                }}
              >
                {t("forgotPassword")}
              </button>
            </div>

            {/*  Signup Link */}
            <p className="text-gray-600 text-sm text-center">
              {t("noAccount")}{" "}
              <button
                type="button"
                className="text-custom-pink font-medium hover:underline"
                onClick={() => {
                  closeLogin();
                  openRegister();
                }}
              >
                {t("createOne")}
              </button>
            </p>

            {/*  Login Button */}
            <Button
              type="submit"
              className="w-full bg-custom-pink hover:bg-custom-pink-100 rounded-[30px] text-white py-2"
              disabled={loading}
            >
              {loading ? t("loggingIn") : t("login")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>,

      document.body
    );
  }

  return null; // ✅ Prevents hydration error
}
