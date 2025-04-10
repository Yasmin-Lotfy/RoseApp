// pages/contact.jsx
import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-custom-pink">{t('title')}</h1>
      <div
        className={`flex flex-col md:flex-row gap-8 ${
          locale === 'ar' ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Contact Info Section */}
        <div className="md:w-1/3 space-y-6">
          {/* Call Anytime */}
          <div
            className={`flex  items-center p-4 border border-gray-200 rounded-lg ${
              locale === 'ar' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full ${
                locale === 'ar' ? 'ml-4' : 'mr-4'
              }`}
            >
              <svg
                className="w-6 h-6 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className={locale === 'ar' ? 'text-right' : ''}>
              <p className="font-semibold text-start text-custom-pink">{t('callAnytime')}</p>
              <p className="text-gray-600 text-start">{t('phoneNumber')}</p>
            </div>
          </div>

          {/* Send Email */}
          <div
            className={`flex  items-center p-4 border border-gray-200 rounded-lg ${
              locale === 'ar' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full ${
                locale === 'ar' ? 'ml-4' : 'mr-4'
              }`}
            >
              <svg
                className="w-6 h-6 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className={locale === 'ar' ? 'text-right' : ''}>
              <p className="font-semibold text-start text-custom-pink">{t('sendEmail')}</p>
              <p className="text-gray-600 text-start">{t('emailAddress')}</p>
            </div>
          </div>

          {/* Visit Us */}
          <div
            className={`flex  items-center p-4 border border-gray-200 rounded-lg ${
              locale === 'ar' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full ${
                locale === 'ar' ? 'ml-4' : 'mr-4'
              }`}
            >
              <svg
                className="w-6 h-6 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className={locale === 'ar' ? 'text-right' : ''}>
              <p className="font-semibold text-start text-custom-pink">{t('visitUs')}</p>
              <p className="text-gray-600 text-start">{t('address')}</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-2/3">
          <form className="p-6 border border-gray-200 rounded-lg">
            <div className="mb-4">
              <input
                type="text"
                placeholder={t('namePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                placeholder={t('phonePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder={t('messagePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 resize-none"
              />
            </div>
            <div className={`flex ${locale === 'ar' ? 'justify-start' : 'justify-end'}`}>
              <button
                type="submit"
                className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-custom-pink transition duration-300 flex items-center"
              >
                {t('sendButton')}
                <svg
                  className={`w-5 h-5 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={locale === 'ar' ? 'M10 19l-7-7m0 0l7-7m-7 7h18' : 'M14 5l7 7m0 0l-7 7m7-7H3'}
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}