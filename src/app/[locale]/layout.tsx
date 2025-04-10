import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "./(public)/_components/navbar";
import Footer from "./(public)/_components/footer";
import LoginModal from "./auth/login/_components/login-form";
import RegisterModal from "./auth/register/_components/register-form";
import ForgotPasswordModal from "./auth/forgetPassword/page";
import { AuthModalProvider } from "@/lib/context/AuthModalContext";
import HydrationSafeComponent from "@/lib/context/HydrationSafeComponent";
import VerifyCodeModal from "./auth/verify/page";
import ResetPasswordModal from "./auth/resetPassword/pagex";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { SearchModalProvider } from "@/lib/context/SearchModalContext";
import SearchModal from "./(public)/search/page";

type LocaleLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  params: { locale },
  children,
}: LocaleLayoutProps) {
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = useMessages();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <title>Rose E-Commerce</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:wght@100..900&family=Open+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <HydrationSafeComponent>
          <AuthModalProvider>
            <SearchModalProvider>
            <Providers>
              <NextIntlClientProvider messages={messages}>
                <Navbar />
                {children}
                <LoginModal />
                
                <RegisterModal />
                <ForgotPasswordModal />
                <VerifyCodeModal />
                <ResetPasswordModal />
                <SearchModal/>
                <Footer />
                <Toaster />
              </NextIntlClientProvider>
            </Providers>
            </SearchModalProvider>
          </AuthModalProvider>
        </HydrationSafeComponent>
      </body>
    </html>
  );
}
