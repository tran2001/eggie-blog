import Header from "@/components/layouts/blog/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className={
        "tw-w-screen tw-h-screen dark:tw-text-dark tw-text-light tw-select-none"
      }
    >
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-20">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
