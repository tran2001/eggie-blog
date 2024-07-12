import IconArrow from "@/components/icons/IconArrow";
import IconSun from "@/components/icons/IconSun";
import IconMoon from "@/components/icons/IconMoon";
import { toggle, setValue } from "@/features/darkMode";
import { RootState } from "app/store";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsOpeningOneBlogContext } from "@/layouts/BlogLayout";

const Header = () => {
  //init
  const dispatch = useDispatch();
  //state
  const { isOpeningOneBlog, setIsOpeningOneBlog } = useContext(IsOpeningOneBlogContext);
  const darkState = useSelector((state: RootState) => state.darkState.value);

  //DOM
  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;

  //useEffect
  useEffect(() => {
    dispatch(setValue(mode));
  }, [mode]);

  //function

  const handleOpenNewTab = () => {
    const url = "https://www.instagram.com/eggogia/";
    window.open(url, "_blank");
  };

  return (
    <div className="">
      <header className="tw-flex tw-justify-between tw-items-center tw-relative">
        {isOpeningOneBlog ? (
          <div
            className="icon-button dark:tw-bg-white"
            onClick={() => setIsOpeningOneBlog(false)}
          >
            {darkState ? (
              <IconArrow color="#392a48" />
            ) : (
              <IconArrow color="#FFF0F5" />
            )}
          </div>
        ) : (
          <div onClick={() => handleOpenNewTab()} className="tw-cursor-pointer">
            <p>eggie's</p>
          </div>
        )}

        <div
          onClick={() => dispatch(toggle())}
          className="icon-button dark:tw-bg-white"
        >
          {darkState ? <IconMoon /> : <IconSun />}
        </div>
      </header>
    </div>
  );
};

export default Header;
