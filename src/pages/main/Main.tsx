import { Outlet } from "react-router-dom";
import { Navbar } from "@components/Navbar";

export const Main = () => {
  return (
      <Navbar>
        <Outlet/>
      </Navbar>
  )
}
