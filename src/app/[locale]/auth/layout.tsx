import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Header from "./_components/header";
import Footer from "../(public)/_components/footer";

type AuthLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export default function AuthLayout({ params: { locale }, children }: AuthLayoutProps) {
  setRequestLocale(locale);

  // Translation
  const t = useTranslations();

  return (
    children
  );
}
