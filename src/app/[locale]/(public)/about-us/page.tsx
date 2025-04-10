"use client"
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function AboutUs() {
  const t = useTranslations();
  const pathname = usePathname();
// Get current locale dynamically from URL or default to "en"
const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en"
  return (
    <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10">
      {/* Left Side - Images */}
      <div className="relative flex flex-col md:flex-col lg:flex-row gap-10 w-full lg:w-1/2 items-center">
        {/* Big Picture */}
        <div className="relative min-w-[250px] max-w-[302px] md:max-w-[350px]">
          {/* Pink Border */}
          <div
            className="absolute w-full h-full left-2 -rotate-[3.09deg] 
               rounded-tl-[50px] rounded-tr-[120px] 
               rounded-br-[120px] rounded-bl-[120px] 
               border-4 border-custom-pink"
          ></div>
          {/* Front Picture */}
          <div
            className="relative w-full h-[344px] top-[24px] left-[27px] 
               rounded-tl-[50px] rounded-tr-[120px] 
               rounded-br-[120px] rounded-bl-[120px] 
               overflow-hidden"
          >
            <Image
              src="/Assets/About/about1.png"
              alt="Gift Box"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Two Small Pictures (Responsive Stacking) */}
        <div className="relative flex flex-col md:flex-row lg:flex-col gap-4 w-full md:w-auto">
          <div className="relative w-[193px] h-[193px] overflow-hidden rounded-[150px] mx-auto md:mx-0">
            <Image
              src="/Assets/About/about2.png"
              alt="Small Gift 1"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div
            className="relative w-[193px] h-[144px] overflow-hidden 
            rounded-tl-[50px] rounded-tr-[100px] 
            rounded-br-[100px] rounded-bl-[50px] mx-auto md:mx-0"
          >
            <Image
              src="/Assets/About/about3.png"
              alt="Small Gift 2"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h3 className="text-[17px] font-[700] tracking-wide text-pink-500 uppercase">
          {t("aboutUs")}
        </h3>
        <h2
          className="text-2xl md:text-4xl font-bold text-gray-900 mt-2"
          dangerouslySetInnerHTML={{ __html: `${t("headingPart1")} <span class="text-pink-500">${t("headingPart2")}</span> ${t("headingPart3")}` }}
        ></h2>
        <p className="text-gray-600 mt-4">
          {t("description")}
        </p>

        <button className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition duration-300">
          <Link href={`/${currentLocale}/about-us`}>{t("discoverMore")}</Link>
        </button>

        {/* Features List */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[t("features.feature1"), t("features.feature2"), t("features.feature3"), t("features.feature4")].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              <FaCheckCircle className="text-custom-violte w-6 h-6" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
