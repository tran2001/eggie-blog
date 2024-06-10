import { createBrowserRouter } from "react-router-dom";
import BlogLayout from "./layouts/BlogLayout";
import BlogHomePage from "./components/pages/blog/BlogHomePage";
import BlogContent from "./components/pages/blog/BlogContent";
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
      {
        path: ":id",
        Component: BlogContent,
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
