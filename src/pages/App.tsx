import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "@root/router";
import { StoreProvider } from "@redux/StoreProvider";
import { ThemeProvider } from "@theme/theme";
import { Loading } from "@components/Loading";
import '@locales/i18n';

export const App = () => {
  return (
      <StoreProvider>
        <ThemeProvider>
          <RouterProvider router={router}/>
          <Outlet/>
          <Loading/>
        </ThemeProvider>
      </StoreProvider>
  )
}
