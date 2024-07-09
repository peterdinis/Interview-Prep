import { QueryClient } from "@tanstack/react-query";
import { queryCache } from "./cache/queryCache";
import { mutationCache } from "./cache/mutationCache";

const twentyFourHoursInMs: number = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: twentyFourHoursInMs,
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});