import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LoginModal from "./_components/login-form";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
     
   

     
      <LoginModal />

     
    </section>
  );
}
