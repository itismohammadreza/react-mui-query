import { Outlet } from "react-router-dom";
import '@locales/i18n';
import { QueryClient } from '@tanstack/react-query';
import { Providers } from "@components/Providers";

const queryClient = new QueryClient();

export const App = () => {
  return (
      <Providers>
        <Outlet/>
      </Providers>
  )
}
