import { Outlet } from "react-router-dom";
import { Providers } from "@components/Providers";

export const App = () => {
  return (
      <Providers>
        <Outlet/>
      </Providers>
  )
}
