import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Register } from "@pages/Register";

const protectedLoader = ({request}: LoaderFunctionArgs) => {
  // const {user} = getState();
  // if (!user.name) {
  //   const params = new URLSearchParams();
  //   params.set("return", new URL(request.url).pathname);
  //   return redirect("/auth/login?" + params.toString());
  // }
  return null;
}

const loginLoader = async () => {
  // const {user} = getState();
  // if user exist, no need to visit login page
  // if (user.name) {
  //   return redirect("/");
  // }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      // return logged in user data
      return {}
    },
    children: [
      {
        path: "",
        element: <Home/>,
      },
      // sample for a protected page
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
