import Image from "next/image";
import StaticBar from "./_components/staticBar";
import Gallery from "./_components/gallery";
import AboutUs from "./about-us/page";
import CategorySlider from "./_components/(CategorySlider)/catSlider";
import GiftSliders from "./_components/giftSliders";
import GiftPictures from "./_components/giftPictures";
import BestSeller from "./_components/bestSeller";
import HomeProducts from "./_components/homeProducts";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <CategorySlider />
        <GiftSliders />
        <GiftPictures />

        <StaticBar />
        <BestSeller />
        <HomeProducts />

        <AboutUs />
        <Gallery />
      </div>
    </>
  );
}
