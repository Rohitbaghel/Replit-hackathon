import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/query-client";
import { Offer } from "../constants/mockData";

interface FetchOffersParams {
  bankName: string;
  cardType: string;
}

export function useOffers() {
  const mutation = useMutation({
    mutationFn: async (params: FetchOffersParams): Promise<Offer[]> => {
      const response = await apiRequest("POST", "/api/offers/fetch", params);
      const offers = await response.json();
      return offers;
    },
  });

  return {
    fetchOffers: mutation.mutate,
    offers: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    reset: mutation.reset,
  };
}
