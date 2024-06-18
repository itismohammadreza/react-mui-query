import { createBrowserRouter, LoaderFunctionArgs, redirect, } from "react-router-dom";
import { Login } from "@pages/auth/Login";
import { Register } from "@pages/auth/Register";
import { Main } from "@pages/main/Main";
import { Home } from "@pages/main/Home";
import { About } from "@pages/main/About";
import { globalStateService } from "@services/globalStateService";

const protectedLoader = ({request}: LoaderFunctionArgs) => {
  const {user} = globalStateService.get();
  if (!user?.name) {
    const params = new URLSearchParams();
    params.set("return", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  return null;
}

const loginLoader = async () => {
  const {user} = globalStateService.get();
  // if user exist, no need to visit login page
  if (user?.name) {
    return redirect("/");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: async () => {
      return {}
    },
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: () => <><h3>Protected</h3></>,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        loader: loginLoader,
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,
      },
    ]
  }
]);
