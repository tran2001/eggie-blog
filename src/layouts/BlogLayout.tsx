import Footer from "@/components/layouts/blog/Footer";
import Header from "@/components/layouts/blog/Header";
// import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
// import data from "../../db.json";

const BlogLayout = () => {
  const params = useParams();
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
          "tw-w-screen tw-h-screen dark:tw-text-dark tw-text-light tw-select-none dark:tw-bg-[url('../public/dark-background.png')] tw-bg-[url('../public/background.png')] sm:tw-hidden"
        }
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-20">
          <Header />
        </div>
        <Outlet />
        <div
          className="tw-absolute tw-bottom-5 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-20"
          style={{
            display: params.id ? "" : "none",
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
