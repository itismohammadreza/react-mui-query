import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@theme/theme";
import { Loading } from "./Loading";
import { Toast } from "./Toast";
import { WithChildren } from "@models/common";
import '@locales/i18n';
import { RouterProvider } from "react-router-dom";
import { router } from "@root/router";

export const Providers = ({children}: WithChildren) => {
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
