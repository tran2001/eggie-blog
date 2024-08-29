import Header from "@/components/layouts/blog/Header";
import PopupMenu from "@/components/layouts/PopupMenu";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const MovieLayout = () => {
  const { id } = useParams();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const handleClosePopupMenu = () => {
    setIsOpenMenu(false);
  };
  useEffect(() => {
    if (id) {
      setIsOpenMenu(false);
    }
  }, [id]);
  return (
    <div
      className={
        "tw-w-screen tw-h-[100dvh] dark:tw-bg-[url('../public/dark-background.png')] tw-bg-[url('../public/background.png')] dark:tw-text-dark tw-text-light tw-select-none"
      }
      style={{
        backgroundSize: "cover",
      }}
    >
      <div
        className={
          "tw-w-full tw-h-full " +
          (isOpenMenu
            ? "tw-block tw-z-40  tw-top-0 tw-absolute dark:tw-bg-[url('../public/dark-background.png')] tw-bg-[url('../public/background.png')]"
            : "tw-hidden")
        }
        style={{
          backgroundSize: "cover",
        }}
      >
        <PopupMenu
          handleCloseMenu={handleClosePopupMenu}
          isOpenMenu={isOpenMenu}
        />
      </div>
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-20">
        <Header />
      </div>
      <div className="tw-h-[60px] tw-blur-xl tw-absolute tw-z-10 dark:tw-bg-light tw-bg-dark tw-w-full tw-left-0 tw-top-0 tw-bg-gradient-to-t"></div>
      <div className="tw-h-[60px] tw-blur-xl tw-absolute tw-z-10 dark:tw-bg-light tw-bg-dark tw-w-full tw-left-0 tw-bottom-0"></div>
      <div className="tw-h-full tw-overflow-scroll tw-p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MovieLayout;
