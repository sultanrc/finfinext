"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// fungsi ini digunakan untuk membungkus komponen anak-anaknya dengan QueryClientProvider dari react-query, sehingga komponen-komponen tersebut dapat menggunakan fitur-fitur dari react-query, seperti useQuery dan useMutation.