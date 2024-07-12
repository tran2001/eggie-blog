import { createBrowserRouter } from "react-router-dom";
import BlogLayout from "./layouts/BlogLayout";
import BlogHomePage from "./components/pages/blog/BlogHomePage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./components/pages/auth/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BlogLayout,
    children: [
      {
        index: true,
        Component: BlogHomePage,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: AuthPage,
      },
    ],
  },
]);
