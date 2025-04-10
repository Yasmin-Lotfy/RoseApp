"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

// Validation schema for the form
const checkoutSchema = z.object({
  firstName: z.string().min(1, "firstNameRequired"),
  lastName: z.string().min(1, "lastNameRequired"),
  email: z.string().email("invalidEmail"),
  phone: z.string().min(10, "phoneMinLength"),
  addressLine1: z.string().min(1, "addressLine1Required"),
  addressLine2: z.string().optional(),
  country: z.string().min(1, "countryRequired"),
  city: z.string().min(1, "cityRequired"),
  state: z.string().min(1, "stateRequired"),
  postCode: z.string().min(5, "postCodeMinLength"),
});

type CheckoutFields = z.infer<typeof checkoutSchema>;

export default function Account() {
  const t = useTranslations("Account");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFields>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (values: CheckoutFields) => {
    console.log("Form submitted:", values);
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <input
            type="text"
            placeholder={t("firstName")}
            {...register("firstName")}
            className="input-style"          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{t(errors.firstName.message)}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            placeholder={t("lastName")}
            {...register("lastName")}
            className="input-style"          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{t(errors.lastName.message)}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder={t("email")}
            {...register("email")}
            className="input-style"          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{t(errors.email.message)}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            placeholder={t("phone")}
            {...register("phone")}
            className="input-style"          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{t(errors.phone.message)}</p>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder={t("addressLine1")}
            {...register("addressLine1")}
            className="input-style"          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">{t(errors.addressLine1.message)}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder={t("addressLine2")}
            {...register("addressLine2")}
            className="input-style"          />
        </div>

        {/* Country */}
        <div className="relative">
          <select
            {...register("country")}
            onChange={(e) => setValue("country", e.target.value, { shouldValidate: true })}
            className="input-style"          >
            <option value="" disabled selected>
              {t("country")}
            </option>
            <option value="usa">{t("countries.usa")}</option>
            <option value="canada">{t("countries.canada")}</option>
            <option value="uk">{t("countries.uk")}</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{t(errors.country.message)}</p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            placeholder={t("city")}
            {...register("city")}
            className="input-style"          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{t(errors.city.message)}</p>
          )}
        </div>

        {/* Post Code */}
        <div>
          <input
            type="text"
            placeholder={t("postCode")}
            {...register("postCode")}
            className="input-style"          />
          {errors.postCode && (
            <p className="text-red-500 text-sm mt-1">{t(errors.postCode.message)}</p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            placeholder={t("state")}
            {...register("state")}
            className="input-style"          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{t(errors.state.message)}</p>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          {t("confirm")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}