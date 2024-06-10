import { setValue } from "@/features/darkmode/darkMode";
import { RootState } from "app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconComment from "@/components/icons/IconComment";
import { useParams } from "react-router-dom";
import IconSend from "@/components/icons/IconSend";

const Footer = () => {
  const dispatch = useDispatch();

  //hooks
  const params = useParams();

  //store
  const darkState = useSelector((state: RootState) => state.darkState.value);

  //state
  const [strokeColor, setStrokeColor] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(true);

  //DOM
  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;

  //useEffect
  useEffect(() => {
    dispatch(setValue(mode));
  }, [mode]);

  useEffect(() => {
    if (darkState) {
      setStrokeColor("#392a48");
    } else {
      setStrokeColor("#FFF0F5");
    }
  }, [darkState]);
  useEffect(() => {
    setIsCommenting(false);
  }, [params]);

  return (
    <div className="">
      <div
        className="tw-relative tw-flex tw-flex-col tw-items-end"
        style={{
          display: isCommenting ? "flex" : "none",
        }}
      >
        <div className="icon-button dark:tw-bg-white tw-absolute tw-bottom-6 tw-right-3">
          <IconSend color={strokeColor} />
        </div>
        <div className="tw-w-full">
          <textarea
            className="tw-w-full tw-outline-none tw-p-5 tw-rounded-xl dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] content-text tw-border tw-text-[12px] tw-mb-3"
            rows={5}
            maxLength={150}
            placeholder="Để lại suy nghĩ cho tao biết nào!"
          ></textarea>
        </div>
      </div>

      <footer className="tw-flex tw-justify-between tw-items-center tw-relative">
        <div></div>
        <div
          onClick={() => setIsCommenting(!isCommenting)}
          className="tw-w-8 tw-h-8 tw-rounded-full dark:tw-bg-white tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center tw-duration-300 tw-cursor-pointer hover:tw-bg-opacity-70"
        >
          <IconComment strokeColor={strokeColor} />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
