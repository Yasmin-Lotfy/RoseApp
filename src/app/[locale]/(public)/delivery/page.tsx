import { useTranslations  } from "next-intl";

export default function Delivery() {
  const t = useTranslations(); // Access translations

  return (
    <section className="max-w-4xl mx-auto px-6 font-[400] py-10">
      <h2 className="text-xl md:text-2xl text-custom-blue mb-4">{t('delivery.title')}</h2>

      <div>
        <h3 className="text-[26px] text-custom-blue">{t('delivery.subtitle')}</h3>

        <p className="text-text-gray text-[20px] my-2">{t('delivery.text1')}</p>
        <p className="text-text-gray text-[20px] my-2">{t('delivery.text2')}</p>
        <p className="text-text-gray text-[20px] my-2">{t('delivery.text3')}</p>
      </div>
    </section>
  );
}
