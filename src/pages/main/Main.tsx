import { Outlet } from "react-router-dom";
import { Navbar } from "@components/Navbar.tsx";

export const Main = () => {
  return (
      <Navbar>
        <Outlet/>
      </Navbar>
  )
}
