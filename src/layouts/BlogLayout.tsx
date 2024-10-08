import Header from "@/components/layouts/blog/Header";
import { createContext, useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import data from "../../db.json";

type TIsOpeningOneBlogContextValue = {
  isOpeningOneBlog: boolean;
  setIsOpeningOneBlog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsOpeningOneBlogContext = createContext<TIsOpeningOneBlogContextValue>({
  isOpeningOneBlog: false,
  setIsOpeningOneBlog: () => {},
});

const BlogLayout = () => {
  const [isOpeningOneBlog, setIsOpeningOneBlog] = useState(false);

  useEffect(() => {
    var lastScrollTop = 0;
    const largest_container = document.getElementById("largest-container");
    const header_container = document.getElementById("header-container");
    if (largest_container) {
      largest_container.onscroll = () => {
        if (largest_container.scrollTop > lastScrollTop) {
          header_container?.classList.add("tw-translate-y-[-100%]");
        } else if (largest_container.scrollTop < lastScrollTop) {
          header_container?.classList.remove("tw-translate-y-[-100%]");
        }
        lastScrollTop =
          largest_container.scrollTop <= 0 ? 0 : largest_container.scrollTop;
      };
    }
  }, []);

  return (
    <div className="tw-overflow-scroll tw-h-[100dvh] tw-w-[100%]" id="largest-container">
      <div className="tw-hidden sm:tw-flex tw-items-center tw-justify-center tw-h-[100dvh] title-text tw-w-full">
        <span>
          App hiện tại chưa làm màn desktop nữa (tại tao lười)
          <br />
        </span>
      </div>
      <div
        className={
          "tw-w-screen tw-h-[100dvh] dark:tw-text-dark tw-text-light tw-select-none sm:tw-hidden"
        }
        style={{
          backgroundSize: "cover",
        }}
      >
        <IsOpeningOneBlogContext.Provider value={{ isOpeningOneBlog, setIsOpeningOneBlog }}>
          <div
            className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-pb-5 tw-z-50 tw-duration-500 tw-bg-opacity-30"
            style={{
              display: isOpeningOneBlog ? "none" : "block",
            }}
            id="header-container"
          >
            <Header />
          </div>
          <Outlet />
        </IsOpeningOneBlogContext.Provider>
      </div>
    </div>
  );
};

export default BlogLayout;
