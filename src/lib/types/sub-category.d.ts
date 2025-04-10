declare type SubCategory = {
  category: string;
  image: string;
  translations: Translations<{
    name: string;
    slug: string;
  }>;
} & DatabaseFields;
