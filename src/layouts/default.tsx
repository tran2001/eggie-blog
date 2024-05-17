import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import PopupMenu from "@/components/layouts/PopupMenu";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  const { id } = useParams();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const handleOpenPopupMenu = () => {
    setIsOpenMenu(true);
  };
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
        "tw-w-screen tw-h-screen dark:tw-bg-[url('../public/dark-background.png')] tw-bg-[url('../public/background.png')] dark:tw-text-dark tw-text-light tw-select-none"
      }
    >
      <div
        className={
          "tw-w-full tw-h-full " +
          (isOpenMenu
            ? "tw-block tw-z-40  tw-top-0 tw-absolute dark:tw-bg-[url('../public/dark-background.png')] tw-bg-[url('../public/background.png')]"
            : "tw-hidden")
        }
      >
        <PopupMenu
          handleCloseMenu={handleClosePopupMenu}
          isOpenMenu={isOpenMenu}
        />
      </div>
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-20">
        <Header handleOpenMenu={handleOpenPopupMenu} />
      </div>
      <div className="tw-h-[60px] tw-blur-xl tw-absolute tw-z-10 dark:tw-bg-light tw-bg-dark tw-w-full tw-left-0 tw-top-0"></div>
      <div className="tw-h-full tw-overflow-scroll tw-p-10">
        <Outlet />
      </div>
      {/* <div className="tw-w-full tw-p-10 tw-bg-opacity-80 tw-bg-black">
        <Footer />
      </div> */}
    </div>
  );
};

export default Layout;
