import data from "../../../db.json";
import { useNavigate } from "react-router-dom";
type Props = {
  handleCloseMenu: () => void;
  isOpenMenu: boolean;
};

const PopupMenu = ({ handleCloseMenu, isOpenMenu }: Props) => {
  const navigate = useNavigate();
  function handleClick(e: string) {
    navigate(`/blog/${e}`);
  }
  return (
    <div
      className={"tw-p-10 tw-relative tw-select-none tw-flex tw-justify-end"}
    >
      <p className="tw-hidden">{isOpenMenu}</p>
      <svg
        onClick={handleCloseMenu}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="tw-w-6 tw-h-6 tw-block tw-absolute tw-left-10 tw-cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
      <div className="tw-flex tw-flex-col tw-items-end">
        {data["blogs"].map((item) => {
          return (
            <>
              <p
                className="hover:tw-text-lightHover dark:hover:tw-text-darkHover tw-cursor-pointer"
                onClick={() => handleClick(item.id)}
                key={item.id}
              >
                {item.title}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PopupMenu;
