import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import { Home } from "@pages/main/Home";
import { Login } from "@pages/auth/Login";
import { globalStateService } from "@services/globalStateService";
import { Main } from "@pages/main/Main";
import { dataService } from "@services/dataService";
import { About } from "@pages/main/About";
import { Register } from "@pages/auth/Register";
import { NotFound } from "@pages/NotFound";

const provideUser = async () => {
  try {
    const storageToken = dataService.hasToken();
    const {user} = globalStateService.get();
    if (!storageToken) {
      return null;
    }
    if (user) {
      return null;
    }
    const {data} = await dataService.getProfile();
    globalStateService.set(prev => ({...prev, user: data}));
    return user;
  } catch {
    return null;
  }
}

const protectedLoader = ({request}: LoaderFunctionArgs) => {
  const {user} = globalStateService.get();
  if (!user) {
    const params = new URLSearchParams();
    params.set("return", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  return null;
}

const loginLoader = async () => {
  const {user} = globalStateService.get();
  if (user) {
    return redirect("/");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: provideUser,
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
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);
