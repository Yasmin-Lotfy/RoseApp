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
import { verifyCodeAction } from "@/lib/actions/auth.action";
import { useTranslations } from "next-intl";

// Schema for form validation
const Schema = z.object({
  code: z.string().min(6, "verificationCodeMin"),
});

type VerifyCodeFields = z.infer<typeof Schema>;

export default function VerifyCodeModal() {
  const { isVerifyModalOpen, closeVerifyModal, isResetPasswordOpen, openResetPassword } = useAuthModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFields>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: VerifyCodeFields) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await verifyCodeAction({ resetCode: values.code });

      console.log("Verify response:", response); // Debugging

      if (response && response.status === "Success") {
        toast.success(t("codeVerifiedSuccessfully"), { position: "top-right" });

        setTimeout(() => {
          closeVerifyModal();
          openResetPassword(); // ✅ Make sure this is called
        }, 500);
      } else {
        toast.error(response?.message || t("invalidVerificationCode"), {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(t("verificationError"), { position: "top-center", autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <Dialog open={isVerifyModalOpen} onOpenChange={closeVerifyModal}>
      {isVerifyModalOpen && <div className="fixed inset-0 bg-black/50 z-[999]" />}
      <DialogContent className="fixed z-[1000] w-full max-w-md bg-white sm:rounded-[20px] rounded-[20px] p-6 shadow-lg border border-black/10">
        <h2 className="text-[30px] font-[400] text-black text-start">
          {t("enterVerificationCode")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-2">
          <Input
            type="text"
            placeholder={t("enterCode")}
            {...register("code")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.code?.message)}</p>

          <Button
            type="submit"
            className="w-full mt-2 bg-custom-pink hover:bg-custom-pink-100 rounded-[30px] text-white py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("verifying") : t("verifyCode")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>,
    document.body
  );
}
