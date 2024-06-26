import Header from "@/components/layouts/blog/Header";
// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import data from "../../db.json";

const BlogLayout = () => {
  return (
    <div>
      <div className="tw-hidden sm:tw-flex tw-items-center tw-justify-center tw-h-screen title-text">
        <span>
          App hiện tại chưa làm màn desktop nữa (tại tao lười) 
          <br />
        </span>
      </div>
      <div
        className={
          "tw-w-screen tw-h-screen dark:tw-text-dark tw-text-light tw-select-none sm:tw-hidden"
        }
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-50">
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default BlogLayout;
