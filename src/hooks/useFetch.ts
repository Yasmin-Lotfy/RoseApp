import { ApiResponse } from "@/lib/types/category";
import { useQuery } from "@tanstack/react-query";



// Fetch function
const fetchData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  const res = await fetch(`https://flower.elevateegy.com/api/v1/${endpoint}`); // Replace with your API base URL
  if (!res.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
  return res.json();
};

// Custom Hook
export function useFetch<T>(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData<T>(endpoint),
  });
}
