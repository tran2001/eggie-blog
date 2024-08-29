import { setValue } from "@/features/darkMode";
import { RootState } from "app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconComment from "@/components/icons/IconComment";
import { useParams } from "react-router-dom";
import IconSend from "@/components/icons/IconSend";
import IconClose from "@/components/icons/IconClose";

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
        className="tw-relative tw-flex tw-flex-col tw-items-end tw-mb-3"
        style={{
          display: isCommenting ? "flex" : "none",
        }}
      >
        <div className="icon-button dark:tw-bg-white tw-absolute tw-bottom-8 tw-right-8">
          <IconSend color={strokeColor} />
        </div>
        <div className="icon-button dark:tw-bg-white tw-absolute tw-top-4 tw-right-4">
          <IconClose color={strokeColor} />
        </div>
        <div className="tw-w-full dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-p-5 tw-rounded-xl tw-shadow-2xl tw-h-[calc(100dvh-400px)] tw-flex tw-flex-col tw-justify-between tw-overflow-y-scroll">
          <div className="tw-h-[100dvh]"></div>
          <textarea
            className="tw-w-full tw-outline-none tw-p-5 tw-rounded-xl dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] content-text tw-border tw-text-[12px] tw-h-[160px]"
            rows={5}
            maxLength={150}
            placeholder="Để lại suy nghĩ cho tao biết nào!"
          ></textarea>
        </div>
      </div>
      <footer
        className="tw-flex tw-justify-between tw-items-center tw-relative"
        style={{
          display: !isCommenting ? "flex" : "none",
        }}
      >
        <div></div>
        <div
          onClick={() => setIsCommenting(!isCommenting)}
          className="tw-w-8 tw-h-8 tw-rounded-full dark:tw-bg-white tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center tw-duration-500 tw-cursor-pointer hover:tw-bg-opacity-70"
        >
          <IconComment strokeColor={strokeColor} />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
