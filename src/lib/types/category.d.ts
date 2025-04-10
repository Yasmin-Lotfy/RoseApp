export interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}


export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
}

export interface CategoryDetails {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDetailsResponse {
  message: string;
  category: CategoryDetails;
}

export interface productResponse{
  category: Category;
  message: string;
  
  products?: Product;
}
export interface ApiResponse<T> {
  message: string;
  metadata: Metadata;
  categories?: T[];
  products?: T[];
}