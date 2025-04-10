"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPasswordAction } from "@/lib/actions/auth.action";
import { useTranslations } from "next-intl";

// Schema for form validation
const Schema = z.object({
  email: z.string().email("invalidEmail"),
  password: z
    .string()
    .min(8, "passwordShort")
    .regex(/[A-Z]/, "passwordUppercase")
    .regex(/[a-z]/, "passwordLowercase")
    .regex(/[0-9]/, "passwordNumber")
    .regex(/[@$!%*?&]/, "passwordSpecialChar"),
});

type ResetPasswordFields = z.infer<typeof Schema>;

export default function ResetPasswordModal() {
  const { isResetPasswordOpen, closeResetPassword, openLogin } = useAuthModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: ResetPasswordFields) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await resetPasswordAction({
        email: values.email,
        newPassword: values.password,
      });

      toast.success(t("passwordResetSuccess"), {
        position: "top-right",
      });

      setTimeout(() => {
        closeResetPassword();
        openLogin();
      }, 1000);
    } catch (error) {
      toast.error(t("passwordResetFailed"), {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <Dialog open={isResetPasswordOpen} onOpenChange={closeResetPassword}>
      {isResetPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999]" />
      )}
      <DialogContent className="fixed z-[1000] w-full max-w-md bg-white sm:rounded-[20px] rounded-[20px] p-6 shadow-lg border border-black/10">
        <h2 className="text-[30px] font-[400] text-black text-start">
          {t("resetYourPassword")}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-2"
        >
          <Input
            type="email"
            placeholder={t("email")}
            {...register("email")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors?.email?.message)}</p>

          <Input
            type="password"
            placeholder={t("newPassword")}
            {...register("password")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors?.password?.message)}</p>

          <Button
            type="submit"
            className="w-full mt-2 bg-custom-pink hover:bg-custom-pink-100 rounded-[30px] text-white py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("resetting") : t("resetPassword")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>,
    document.body
  );
}
