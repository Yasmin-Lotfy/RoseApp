"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/../public/Assets/logo.png";
import { useAuthModal } from "@/lib/context/AuthModalContext";
import { useSession, signOut } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RiHandbagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/Redux/store";
import { getCart } from "@/lib/Redux/cartSlice";
import { useSearchModal } from "@/lib/context/SearchModalContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLanguageDropdownOpen, setMobileLanguageDropdownOpen] =
    useState(false);
    const { openSearch } = useSearchModal();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { openLogin } = useAuthModal();
  let dispatch = useDispatch<AppDispatch>();

  const t = useTranslations();
  let { cart } = useSelector((state: RootState) => state);
  console.log(cart);

  // Get current locale dynamically from URL or default to "en"
  const currentLocale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  // Handle protected routes (require login)
  const handleProtectedRouteClick = (path: string) => {
    if (!session) {
      router.push(`/${currentLocale}`);
      openLogin();
    } else {
      router.push(path);
    }
  };

  // Handle language toggle
  const handleLanguageToggle = (newLocale: string) => {
    const pathSegments = pathname.split("/");
    if (pathSegments[1] === "en" || pathSegments[1] === "ar") {
      pathSegments[1] = newLocale; // Replace locale
    } else {
      pathSegments.unshift(newLocale); 
      // Add locale if missing 
    }

    const newPath = pathSegments.join("/");
    router.push(newPath); // Update route

    // Close dropdowns
    setDropdownOpen(false);
    setMobileLanguageDropdownOpen(false);
  };
 useEffect(() => {
    // التأكد من وجود الـ token قبل استدعاء `getCart`
    if (session?.accessToken) {
      dispatch(getCart({ token: session?.accessToken }));
    } else {
      console.log("No token available");
    }
  }, [dispatch, session?.accessToken]);

  return (
    <nav className="flex items-center z-50 justify-between px-8 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo.src}
          alt="Flower-Ecommerce"
          className="h-12 cursor-pointer"
          onClick={() => router.push(`/${currentLocale}`)}
        />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-md">
        <li
          className={`cursor-pointer text-custom-blue`}
          onClick={() => router.push(`/${currentLocale}`)}
        >
          {t("home")}
        </li>
        <li
          className="text-custom-blue hover:text-custom-pink transition duration-300 cursor-pointer"
          onClick={() => router.push(`/${currentLocale}/AllCategories`)}
        >
          {t("allCategory")}
        </li>
        <li
          className="cursor-pointer text-custom-blue"
          onClick={() =>
            handleProtectedRouteClick(`/${currentLocale}/about-us`)
          }
        >
          {t("about")}
        </li>
        <li
          className="cursor-pointer text-custom-blue"
          onClick={() => router.push(`/${currentLocale}/contact`)}
        >
          {t("contact")}
        </li>
      </ul>

      {/* Right Section (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <IoSearchSharp
          className="text-custom-pink cursor-pointer"
          size={20}
          onClick={openSearch} 
        />

        {session ? (
          <>
            <div
              className="relative text-custom-pink cursor-pointer px-2"
              onClick={() =>
                handleProtectedRouteClick(`/${currentLocale}/wishList`)
              }
            >
              <FaRegHeart className="" size={20} />
              <span className="absolute top-[-10px] end-[-7px] bg-custom-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            <div
              className="relative text-custom-pink cursor-pointer px-2"
              onClick={() =>
                handleProtectedRouteClick(`/${currentLocale}/cart`)
              }
            >
              <RiHandbagLine className="" size={20} />
              <span className="absolute top-[-10px] end-[-3px] bg-custom-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart ? cart?.cartItemsCount : 0}
              </span>
            </div>
            <FaRegUser
              className="text-custom-pink cursor-pointer"
              size={20}
              onClick={() =>
                handleProtectedRouteClick(`/${currentLocale}/account`)
              }
            />
            <Button
              className="bg-custom-pink text-white px-6 py-2 rounded-full hover:bg-light-pink"
              onClick={() => signOut()}
            >
              {t("logout")}
            </Button>
          </>
        ) : (
          <Button
            className="bg-custom-pink text-white px-6 py-2 rounded-full hover:bg-light-pink"
            onClick={openLogin}
          >
            {t("login")}
          </Button>
        )}

        {/* Language Toggle (Desktop) */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-custom-pink text-white p-2 rounded-full hover:bg-light-pink"
          >
            <FiGlobe size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute end-0 mt-2 px-5 bg-custom-pink text-white rounded-[20px] shadow-lg">
              <button
                className="block text-center px-4 py-2 rounded-[20px]"
                onClick={() =>
                  handleLanguageToggle(currentLocale === "en" ? "ar" : "en")
                }
              >
                {currentLocale === "en" ? "العربية" : "English"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden block">
        <button onClick={() => setIsOpen(!isOpen)} className="text-custom-pink">
          {isOpen ? (
            <X size={28} className="text-custom-pink" />
          ) : (
            <Menu size={28} className="text-custom-pink" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col items-center gap-4">
            <a
              className="text-custom-pink cursor-pointer"
              onClick={() => router.push(`/${currentLocale}`)}
            >
              {t("home")}
            </a>
            <a
              className="text-custom-blue hover:text-custom-pink transition duration-300 cursor-pointer"
              onClick={() => router.push(`/${currentLocale}/AllCategories`)}
            >
              {t("allCategory")}
            </a>
            <a
              className="text-custom-blue hover:text-custom-pink transition duration-300 cursor-pointer"
              onClick={() =>
                handleProtectedRouteClick(`/${currentLocale}/about-us`)
              }
            >
              {t("about")}
            </a>
            <a
              className="text-custom-blue hover:text-custom-pink transition duration-300 cursor-pointer"
              onClick={() => router.push(`/${currentLocale}/contact`)}
            >
              {t("contact")}
            </a>

            {/* Right Section (Mobile) - Flex Column */}
            <div className="flex flex-col items-center gap-4 mt-4 w-full">
              <IoSearchSharp
                className="text-custom-pink cursor-pointer"
                size={20}
                onClick={openSearch}
              />

              {session ? (
                <>
                  <div
                    className="relative text-custom-pink cursor-pointer px-2"
                    onClick={() =>
                      handleProtectedRouteClick(`/${currentLocale}/wishList`)
                    }
                  >
                    <FaRegHeart className="" size={20} />
                    <span className="absolute top-[-10px] end-[-7px] bg-custom-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <div
                    className="relative text-custom-pink cursor-pointer px-2"
                    onClick={() =>
                      handleProtectedRouteClick(`/${currentLocale}/cart`)
                    }
                  >
                    <RiHandbagLine className="" size={20} />
                    <span className="absolute top-[-10px] end-[-3px] bg-custom-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cart ? cart?.cartItemsCount : 0}
                    </span>
                  </div>
                  <FaRegUser
                    className="text-custom-pink cursor-pointer"
                    size={20}
                    onClick={() =>
                      handleProtectedRouteClick(`/${currentLocale}/account`)
                    }
                  />
                  <Button
                    className="bg-custom-pink text-white px-6 py-2 rounded-full hover:bg-light-pink "
                    onClick={() => signOut()}
                  >
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-custom-pink text-white px-6 py-2 rounded-full hover:bg-light-pink "
                  onClick={openLogin}
                >
                  {t("login")}
                </Button>
              )}

              {/* Language Toggle (Mobile) */}
              <div className="relative ">
                <button
                  onClick={() =>
                    setMobileLanguageDropdownOpen(!mobileLanguageDropdownOpen)
                  }
                  className="bg-custom-pink text-white p-2 rounded-full hover:bg-light-pink w-full flex items-center justify-center"
                >
                  <FiGlobe size={20} />
                </button>
                {mobileLanguageDropdownOpen && (
                  <div className="absolute top-12 text-center left-0 mt-2 px-10  bg-custom-pink text-white rounded-[20px] shadow-lg">
                    <button
                      className="block w-full text-center  py-2 rounded-[20px]"
                      onClick={() =>
                        handleLanguageToggle(
                          currentLocale === "en" ? "ar" : "en"
                        )
                      }
                    >
                      {currentLocale === "en" ? "العربية" : "English"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
