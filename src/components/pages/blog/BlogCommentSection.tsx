import { useCommentBlogMutation } from "@/api/blog";
import { IBlog, IComment } from "@/interfaces/common.interfaces";
import { RootState } from "app/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import IconSend from "@/components/icons/IconSend";
import IconClose from "@/components/icons/IconClose";
import { jwtDecode } from "jwt-decode";
import SigninForm from "../auth/SigninForm";
import SignupForm from "../auth/SignupForm";

type Props = {
  isCommenting: boolean;
  closeCommentSection: () => void;
  blogId: string;
  comments: IComment[];
};

const BlogCommentSection = ({
  isCommenting,
  closeCommentSection,
  blogId,
  comments,
}: Props) => {
  const { value: darkState } = useSelector(
    (state: RootState) => state.darkState
  );
  const { value: isLoggedIn } = useSelector(
    (state: RootState) => state.authState
  );
  const commentInputRef = useRef<HTMLInputElement>(null);

  const accessToken = localStorage.getItem("accessToken");

  //state
  const [strokeColor, setStrokeColor] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(true);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [isConfirmSigningIn, setIsConfirmSigningIn] = useState<boolean>(false);

  //queries
  const [commentBlog] = useCommentBlogMutation();

  const onSubmitComment = async () => {
    try {
      if (!comment) return;
      const payload = {
        content: comment,
        user: decodedToken?._id,
      };
      // await useCommentBlogMutation(blogId, payload);
      commentBlog({ id: blogId, payload });
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

  const handleCloseCommentSection = () => { 
    closeCommentSection();
    setIsSigningIn(true);
    setIsConfirmSigningIn(false);
  };

  //useEffect

  useEffect(() => {
    if (accessToken) {
      const decoded: any = jwtDecode(String(accessToken));
      setDecodedToken(decoded);
    }
  }, [accessToken]);

  useEffect(() => {
    if (darkState) {
      setStrokeColor("#392a48");
      setColor("#FFF0F5");
    } else {
      setStrokeColor("#FFF0F5");
      setColor("#392a48");
    }
  }, [darkState]);

  return (
    <div>
      <div>
        <div className="tw-absolute dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-h-[80%] tw-w-[90%] tw-bottom-10 tw-right-1/2 tw-translate-x-1/2 tw-rounded-xl tw-shadow-2xl tw-p-5 tw-flex tw-flex-col tw-justify-between tw-z-50">
          <span
            className="tw-absolute tw-top-1/2 tw-left-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%] content-text tw-text-[12px]"
            style={{
              display: comments?.length === 0 ? "" : "none",
            }}
          >
            Chưa ai comment cả 🙂
          </span>
          <div className="tw-pt-2 tw-overflow-y-scroll">
            <div className="tw-flex tw-flex-col-reverse">
              {comments?.map((comment: IComment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
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
            style={{ display: isLoggedIn ? "flex" : "none" }}
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
            className="icon-button dark:tw-bg-white tw-absolute tw-top-4 tw-right-4 tw-z-50"
            onClick={() => handleCloseCommentSection()}
          >
            <IconClose color={strokeColor} />
          </div>

          <button
            className="tw-mt-3 dark:tw-bg-dark tw-bg-light tw-w-full tw-py-2 tw-rounded-xl tw-bg-opacity-90 hover:tw-bg-opacity-100"
            onClick={() => setIsConfirmSigningIn(!isConfirmSigningIn)}
          >
            <span className="tw-text-[14px] tw-text-dark dark:tw-text-light content-text">
              Đăng nhập để bình luận
            </span>
          </button>
        </div>
        <div
          className="tw-absolute dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-h-[80%] tw-w-[90%] tw-bottom-10 tw-right-1/2 tw-translate-x-1/2 tw-rounded-xl tw-shadow-2xl tw-p-5 tw-flex tw-flex-col tw-justify-between tw-z-50"
          style={{
            display: !isLoggedIn && isConfirmSigningIn ? "flex" : "none",
          }}
        >
          <div className="content-text tw-text-[12px] tw-h-full tw-flex tw-items-center tw-justify-center">
            {isSigningIn ? (
              <SigninForm changeStatus={handleChangeStatus} color={color} />
            ) : (
              <SignupForm changeStatus={handleChangeStatus} color={color} />
            )}
          </div>
          <div
            className="icon-button dark:tw-bg-white tw-absolute tw-top-4 tw-right-4 tw-z-50"
            onClick={() => handleCloseCommentSection()}
          >
            <IconClose color={strokeColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCommentSection;
