import Image from "next/image";
import { useTranslations } from 'next-intl';

const stores = [
  {
    id: 1,
    name: "Store 1",
    address: "3020 SW 8th St Miami\nMiami, Florida 33135\nUnited States",
    image: "/Assets/Stores/store1.jpg",
  },
  {
    id: 2,
    name: "Store 2",
    address: "3020 SW 8th St Miami\nMiami, Florida 33135\nUnited States",
    image: "/Assets/Stores/store2.jpg",
  },
  {
    id: 3,
    name: "Store 3",
    address: "3020 SW 8th St Miami\nMiami, Florida 33135\nUnited States",
    image: "/Assets/Stores/store3.jpg",
  },
];

export default function StoreLocations() {
  const t = useTranslations();

  return (
    <section className="max-w-[1232px] mx-auto px-4 sm:px-6 py-10">
      {stores.map((store) => (
        <div
          key={store.id}
          className="flex flex-col md:flex-row items-center border-2 border-pink-400 rounded-[20px] p-6 mb-6 shadow-lg w-full"
        >
          {/* Store Image */}
          <div className="relative w-full md:w-[220px] h-[200px] md:h-[180px] overflow-hidden rounded-lg">
            <Image
              src={store.image}
              alt={store.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Store Info */}
          <div className="flex-1 text-center md:text-center px-6 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold text-custom-blue">{t(store.name)}</h2>
            <p className="text-custom-blue whitespace-pre-line text-sm mt-2">
              {t(store.address)}
            </p>
          </div>

          {/* Store Hours */}
          <div className="text-custom-blue text-sm text-center md:text-left mt-4 md:mt-0">
            <h3 className="font-semibold mb-1">{t('monday')}</h3>
            <ul className="list-none">
              <li>• {t('hours')}</li>
              <li>• {t('hours')}</li>
              <li>• {t('hours')}</li>
              <li>• {t('hours')}</li>
              <li>• {t('hours')}</li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
