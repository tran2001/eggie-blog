import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IBlog, IComment } from "@/interfaces/common.interfaces";
import { commentBlog, getOneBlog } from "@/api/blog";
import IconComment from "@/components/icons/IconComment";
import { setValue } from "@/features/darkmode/darkMode";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import IconSend from "@/components/icons/IconSend";
import IconClose from "@/components/icons/IconClose";
import Comment from "./Comment";
import SigninForm from "../auth/SigninForm";
import SignupForm from "../auth/SignupForm";

const BlogContent = () => {
  const darkState = useSelector((state: RootState) => state.darkState.value);
  const dispatch = useDispatch();

  //DOM

  const { id } = useParams();
  const params = useParams();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const accessToken = localStorage.getItem("accessToken");

  //state
  const [color, setColor] = useState<string>("");
  const [strokeColor, setStrokeColor] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(true);
  const [blog, setBlog] = useState<IBlog | null>();
  const [comment, setComment] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(true);

  const getBlog = async () => {
    try {
      const res = await getOneBlog(id);
      setBlog(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitComment = async () => {
    try {
      if (!comment) return;
      const payload = {
        content: comment,
        user: "666fef00065b150492a027b1",
      };
      await commentBlog(id, payload);
      await getBlog();
      setComment("");
      if (commentInputRef.current) {
        commentInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = (status: boolean) => {
    setIsSigningIn(status);
  };

  //  DOM

  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;

  const scrollTextRef = useRef<HTMLElement>(null);
  const containerRef = useCallback((node: any) => {
    if (node) {
      node.addEventListener("scroll", () => {
        if (scrollTextRef.current) {
          scrollTextRef.current.classList.add("tw-hidden");
        }
      });
    }
  }, []);

  //useEffect

  useEffect(() => {
    dispatch(setValue(mode));
  }, [mode]);

  useEffect(() => {
    if (darkState) {
      setStrokeColor("#392a48");
      setColor("#FFF0F5");
    } else {
      setStrokeColor("#FFF0F5");
      setColor("#392a48");
    }
  }, [darkState]);
  useEffect(() => {
    setIsCommenting(false);
  }, [params.id]);

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      {blog ? (
        <div
          className={`tw-h-full tw-relative tw-overflow-hidden`}
          ref={containerRef}
        >
          <div
            className="tw-h-full tw-absolute tw-z-0 tw-w-full"
            style={{
              background: `url('${blog?.background}')`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="tw-relative tw-h-full tw-overflow-scroll">
            <div className="tw-h-screen tw-relative tw-mt-[100%]">
              <div className="tw-sticky tw-top-20 tw-w-full tw-justify-center tw-flex tw-flex-col tw-items-center">
                <span
                  className="tw-text-[30px]"
                  style={{
                    color: blog.theme === "dark" ? "#FFF0F5" : "#392a48",
                  }}
                >
                  {blog?.title}
                </span>
                <span
                  className="content-text"
                  style={{
                    color: blog.theme === "dark" ? "#FFF0F5" : "#392a48",
                  }}
                >
                  (swipe up to read)
                </span>
              </div>
            </div>
            <div className="tw-flex tw-justify-center tw-p-10 dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-rounded-t-[50px] tw-overflow-scroll tw-absolute -tw-translate-y-[500px]">
              <div className="tw-w-full tw-flex tw-flex-col tw-mb-[100px] tw-max-w-[600px]">
                <div className="tw-flex tw-flex-col tw-w-full tw-items-center">
                  <div className="tw-flex tw-flex-col tw-items-center tw-w-full">
                    <span
                      className="tw-text-[14px] content-text tw-w-full"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></span>
                  </div>
                  {/* <img
                    key={blog?.id}
                    className="tw-object-cover tw-rounded-[16px] tw-mt-5"
                    src={blog?.image}
                    alt=""
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="tw-absolute dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-h-[80%] tw-w-[90%] tw-bottom-10 tw-right-1/2 tw-translate-x-1/2 tw-rounded-xl tw-shadow-2xl tw-p-5 tw-flex tw-flex-col tw-justify-between"
            style={{ display: isCommenting && accessToken ? "flex" : "none" }}
          >
            <span
              className="tw-absolute tw-top-1/2 tw-left-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%] content-text tw-text-[12px]"
              style={{
                display: blog.commentIds.length === 0 ? "" : "none",
              }}
            >
              Chưa ai comment cả 🙂
            </span>
            <div className="tw-pt-2 tw-overflow-y-scroll">
              {blog && blog.commentIds
                ? blog.commentIds.map((comment: IComment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))
                : null}
            </div>
            <textarea
              ref={commentInputRef as any}
              className="tw-w-full tw-outline-none tw-p-5 tw-rounded-xl dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] content-text tw-border tw-text-[12px] tw-h-[130px]"
              rows={5}
              maxLength={150}
              placeholder="Để lại suy nghĩ cho tao biết nào!"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            <div
              className="icon-button dark:tw-bg-white tw-absolute tw-bottom-8 tw-right-8"
              onClick={onSubmitComment}
              style={{
                display: comment ? "flex" : "none",
              }}
            >
              <IconSend color={strokeColor} />
            </div>
            <div
              className="icon-button dark:tw-bg-white tw-absolute tw-top-4 tw-right-4"
              onClick={() => setIsCommenting(false)}
            >
              <IconClose color={strokeColor} />
            </div>
          </div>
          <div
            className="tw-absolute dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-h-[80%] tw-w-[90%] tw-bottom-10 tw-right-1/2 tw-translate-x-1/2 tw-rounded-xl tw-shadow-2xl tw-p-5 tw-flex tw-flex-col tw-justify-between"
            style={{ display: isCommenting && !accessToken ? "flex" : "none" }}
          >
            <div className="content-text tw-text-[12px] tw-h-full tw-flex tw-items-center tw-justify-center">
              {isSigningIn ? (
                <SigninForm
                  changeStatus={handleChangeStatus}
                  color={color}
                  setIsCommenting={setIsCommenting}
                />
              ) : (
                <SignupForm changeStatus={handleChangeStatus} color={color} />
              )}
            </div>
            <div
              className="icon-button dark:tw-bg-white tw-absolute tw-top-4 tw-right-4"
              onClick={() => setIsCommenting(false)}
            >
              <IconClose color={strokeColor} />
            </div>
          </div>
          <div className="tw-absolute tw-bottom-10 tw-right-10">
            <footer
              style={{
                display: !isCommenting ? "flex" : "none",
              }}
            >
              <div
                onClick={() => setIsCommenting(!isCommenting)}
                className="tw-w-8 tw-h-8 tw-rounded-full dark:tw-bg-white tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center tw-duration-300 tw-cursor-pointer hover:tw-bg-opacity-70"
              >
                <IconComment strokeColor={strokeColor} />
              </div>
            </footer>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogContent;
