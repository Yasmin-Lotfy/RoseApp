import { Product, productResponse } from "@/lib/types/category";
import { useQuery } from "@tanstack/react-query";



// Fetch function for category details 
const fetchProductData = async <T>(endpoint: string): Promise<Product> => {
  const res = await fetch(`https://flower.elevateegy.com/api/v1/${endpoint}`); // Replace with your API base URL
  if (!res.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
  return res.json();
};

// Custom Hook
export function useFetchProductDetails<T>(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchProductData<T>(endpoint),
  });
}
