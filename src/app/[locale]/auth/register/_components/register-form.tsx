"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { registerAction } from "@/lib/actions/auth.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

//  التحقق من صحة البيانات باستخدام zod
const Schema = z
  .object({
    firstName: z.string().min(2, "firstNameShort"),
    lastName: z.string().min(2, "lastNameShort"),
    phone: z.string().min(10, "invalidPhone"),
    email: z.string().email("invalidEmail"),
    gender: z.enum(["male", "female"], {
      message: "invalidGender",
    }),
    password: z.string().min(8, "passwordShort"),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "passwordsMismatch",
    path: ["rePassword"],
  });

type RegisterFields = z.infer<typeof Schema>;

export default function RegisterModal() {
  const { isRegisterOpen, closeRegister, openLogin } = useAuthModal();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: RegisterFields) => {
    try {
      console.log("Sending request...");
      const data = await registerAction(values);
      console.log(data, "server data");

      toast.success(t("registrationSuccess"), { position: "top-right" });

      setTimeout(() => {
        closeRegister();
        openLogin();
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("registrationFailed");

      toast.error(errorMessage, { position: "top-center" });
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <Dialog open={isRegisterOpen} onOpenChange={closeRegister}>
      {isRegisterOpen && <div className="fixed inset-0 bg-black/50 z-[999]" />}
      <DialogContent className="fixed z-[1000] w-full max-w-md bg-white rounded-[20px] p-6 shadow-lg border border-black/10">
        <ToastContainer className="z-[1100]" />

        <DialogTitle className="text-[30px] font-[400] text-black">
          {t("createAccount")}
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-2"
        >
          <Input
            type="text"
            placeholder={t("firstName")}
            {...register("firstName")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.firstName?.message)}</p>

          <Input
            type="text"
            placeholder={t("lastName")}
            {...register("lastName")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.lastName?.message)}</p>

          <Input
            type="tel"
            placeholder={t("phoneNumber")}
            {...register("phone")}
            className="w-full px-4 py-2 text-satrt placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.phone?.message)}</p>

          <Input
            type="email"
            placeholder={t("email")}
            {...register("email")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.email?.message)}</p>

          <div className="mt-1">
            <Input
              type="text"
              placeholder={t("gender")}
              list="gender-options"
              {...register("gender")}
              className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
            />
            <datalist id="gender-options">
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </datalist>
            <p className="text-red-500 text-sm">{t(errors.gender?.message)}</p>
          </div>

          <Input
            type="password"
            placeholder={t("password")}
            {...register("password")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">{t(errors.password?.message)}</p>

          <Input
            type="password"
            placeholder={t("confirmPassword")}
            {...register("rePassword")}
            className="w-full px-4 py-2 placeholder:text-[#797979] rounded-[20px] border border-black/10 shadow-lg"
          />
          <p className="text-red-500 text-sm">
            {t(errors.rePassword?.message)}
          </p>

          <p className="text-black text-sm text-center mt-2">
            {t("alreadyHaveAccount")}{" "}
            <button
              className="text-custom-pink font-medium hover:underline"
              onClick={() => {
                closeRegister();
                openLogin();
              }}
            >
              {t("login")}
            </button>
          </p>

          <Button
            className="w-full mt-2 bg-custom-pink hover:bg-custom-pink-100 rounded-[30px] text-white py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("registering") : t("register")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>,
    document.body
  );
}
