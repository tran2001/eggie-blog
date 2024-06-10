import IconArrow from "@/components/icons/IconArrow";
import IconSun from "@/components/icons/IconSun";
import IconMoon from "@/components/icons/IconMoon";
import { toggle, setValue } from "@/features/darkmode/darkMode";
import { RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const params = useParams();
  const navigate = useNavigate();
  const darkState = useSelector((state: RootState) => state.darkState.value);
  const dispatch = useDispatch();
  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
  useEffect(() => {
    dispatch(setValue(mode));
  }, [mode]);

  const handleBack = () => {
    navigate("/");
  };

  const handleOpenNewTab = () => {
    const url = "https://www.instagram.com/eggogia/";
    window.open(url, "_blank");
  };

  return (
    <div className="">
      <header className="tw-flex tw-justify-between tw-items-center tw-relative">
        {Object.keys(params).length ? (
          <div
            className="icon-button dark:tw-bg-white"
            onClick={() => handleBack()}
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
