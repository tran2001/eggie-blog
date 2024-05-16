import { toggle, setValue } from "@/features/darkmode/darkMode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  handleOpenMenu: () => void;
};

const Header = ({ handleOpenMenu }: Props) => {
  const dispatch = useDispatch();
  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
  useEffect(() => {
    dispatch(setValue(mode));
  }, [mode]);
  return (
    <div className="">
      <header className="tw-flex tw-justify-between tw-items-center tw-relative">
        <div className="tw-flex tw-items-center tw-gap-x-3">
          <svg
            onClick={handleOpenMenu}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="tw-w-5 tw-h-5 tw-cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M2 6.75A.75.75 0 0 1 2.75 6h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 6.75Zm0 6.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="dark:tw-text-dark tw-text-light">eggie's blog</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="tw-w-5 tw-h-5 dark:tw-opacity-100 tw-opacity-0 tw-duration-300 tw-absolute tw-top-1/2 tw-right-0 -tw-translate-y-1/3 tw-cursor-pointer"
          onClick={() => dispatch(toggle())}
        >
          <path
            fillRule="evenodd"
            d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="tw-w-5 tw-h-5 dark:tw-opacity-0 tw-opacity-100 tw-duration-300 tw-absolute tw-top-1/2 tw-right-0 -tw-translate-y-1/3 tw-cursor-pointer"
          onClick={() => dispatch(toggle())}
        >
          <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
        </svg>
      </header>
      <div className="dark:tw-bg-dark tw-bg-light tw-h-[2px] tw-mt-2 tw-mb-5"></div>
    </div>
  );
};

export default Header;
