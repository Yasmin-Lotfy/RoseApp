
  
  import { useTranslations } from 'next-intl';
  
  export default function Policy() {
    const t = useTranslations();
  
    return (
      <section className="max-w-4xl mx-auto px-6 font-[400] py-10">
        <h2 className="text-xl md:text-2xl text-custom-blue mb-4">
          {t('termsAndConditions')}
        </h2>
  
        <div className="space-y-6">
          <div>
            <h3 className="text-[26px] text-custom-blue">{t('rule1Title')}</h3>
            <p className="text-text-gray text-[20px] mt-2">
              {t('rule1Description')}
            </p>
          </div>
  
          <div>
            <h3 className="text-[26px] text-custom-blue">{t('rule2Title')}</h3>
            <p className="text-text-gray text-[20px] mt-2">
              {t('rule2Description')}
            </p>
          </div>
  
          <div>
            <h3 className="text-[26px] text-custom-blue">{t('rule3Title')}</h3>
            <p className="text-text-gray text-[20px] mt-2">
              {t('rule3Description')}
            </p>
          </div>
        </div>
      </section>
    );
  }
  