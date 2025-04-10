import { useQuery } from "@tanstack/react-query";
import { BestSellerResponse } from "@/lib/types/bestseller";

const fetchBestSellers = async (): Promise<BestSellerResponse> => {
  const response = await fetch("https://flower.elevateegy.com/api/v1/best-seller");
  if (!response.ok) {
    throw new Error("Failed to fetch best sellers");
  }
  return response.json();
};

export const useBestSeller = () => {
  return useQuery({
    queryKey: ["best-seller"],
    queryFn: fetchBestSellers,
  });
};
