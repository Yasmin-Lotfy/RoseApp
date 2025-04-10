"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordAction } from "@/lib/actions/auth.action";
import { useTranslations } from "next-intl";

const Schema = z.object({
  email: z.string().email("invalidEmailFormat"),
});

type ForgotPasswordFields = z.infer<typeof Schema>;

export default function ForgotPasswordModal() {
  const {
    isForgotPasswordOpen,
    closeForgotPassword,
    openVerifyModal,
    openLogin,
  } = useAuthModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFields>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: ForgotPasswordFields) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await forgotPasswordAction({ email: values.email });
      
      setTimeout(() => {
        toast.success(t("passwordResetSuccess"), { position: "top-right" });
      }, 100);
      
      setTimeout(() => {
        closeForgotPassword();
        openVerifyModal();
      }, 1000);
    } catch (error) {
      toast.error(t("passwordResetFailed"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        closeButton: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <Dialog open={isForgotPasswordOpen} onOpenChange={closeForgotPassword}>
      {isForgotPasswordOpen && <div className="fixed inset-0 bg-black/50 z-[999]" />}
      <DialogContent className="fixed z-[1000] w-full max-w-md bg-white sm:rounded-[20px] rounded-[20px] p-6 shadow-lg border border-black/10">
        <ToastContainer limit={1} closeOnClick draggable={false} />
        <h2 className="text-[30px] font-[400] text-black text-start">
          {t("forgotPasswordTitle")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-2">
          <Input
            type="email"
            placeholder={t("email")}
            {...register("email")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.email?.message)}</p>

          <Button
            type="submit"
            className="w-full mt-2 bg-custom-pink hover:bg-custom-pink-100 rounded-[30px] text-white py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("sending") : t("recoverPassword")}
          </Button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-4">
          {t("rememberPassword")} {" "}
          <button
            className="text-custom-pink font-medium hover:underline"
            onClick={() => {
              closeForgotPassword();
              openLogin();
            }}
          >
            {t("login")}
          </button>
        </p>
      </DialogContent>
    </Dialog>,
    document.body
  );
}