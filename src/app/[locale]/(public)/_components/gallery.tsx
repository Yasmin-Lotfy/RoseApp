"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
  "/Assets/Gallery/gift1.png",
  "/Assets/Gallery/gift2.png",
  "/Assets/Gallery/gift3.jpg",
  "/Assets/Gallery/gift4.png",
  "/Assets/Gallery/gift5.png",
];

export default function PhotoGallery() {
  const t = useTranslations("PhotoGallery");

  return (
    <div className="container mx-auto my-10 px-4">
      <p className="text-custom-pink font-[700] text-[17px] text-center uppercase py-3">
        {t("galleryTitle")}
      </p>

      <div className="flex items-center justify-center">
        <h2 className="text-xl sm:text-2xl relative after:absolute after:bg-custom-pink after:h-[2px] after:w-[40%] after:bottom-[-5px] after:left-0 font-bold text-center text-custom-blue mb-6">
          {t("gallerySubtitle")}
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* First Row (3 Images) */}
        {images.slice(0, 3).map((src, index) => (
          <div key={index} className="col-span-1 overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={`${t("imageAlt")} ${index + 1}`}
              width={300}
              height={200}
              className="w-full h-[300px] object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer rounded-2xl"
            />
          </div>
        ))}

        {/* Second Row (2 Images in Medium Screens) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-2 rounded-2xl overflow-hidden">
          <Image
            src={images[3]}
            alt={t("imageAlt") + " 4"}
            width={600}
            height={250}
            className="w-full h-[300px] object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer rounded-2xl"
          />
        </div>
        <div className="col-span-1 md:col-span-1 overflow-hidden rounded-2xl">
          <Image
            src={images[4]}
            alt={t("imageAlt") + " 5"}
            width={300}
            height={250}
            className="w-full h-[300px] object-cover hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
