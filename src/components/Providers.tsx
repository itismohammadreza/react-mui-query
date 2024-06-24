import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@theme/theme";
import { Loading } from "./Loading";
import { Toast } from "./Toast";
import '@locales/i18n';
import { RouterProvider } from "react-router-dom";
import { router } from "@root/router";
import { PropsWithChildren } from "react";

export const Providers = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3
      }
    }
  });

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router}/>
          <Loading/>
          <Toast/>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
  );
}
