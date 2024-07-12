import IconArrow from "@/components/icons/IconArrow";
import IconComment from "@/components/icons/IconComment";
import IconMoon from "@/components/icons/IconMoon";
import IconSun from "@/components/icons/IconSun";
import { toggle } from "@/features/darkMode";
import { IBlog, IComment } from "@/interfaces/common.interfaces";
import { IsOpeningOneBlogContext } from "@/layouts/BlogLayout";
import { RootState } from "app/store";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCommentSection from "./BlogCommentSection";
import { useGetOneBlogQuery, useLazyGetOneBlogQuery } from "@/api/blog";

type Props = {
  blogItem: IBlog;
  cardClick: (e: string, status: boolean) => void;
};

const BlogCard = forwardRef(
  ({ blogItem, cardClick }: Props, ref: Ref<() => void>) => {
    //init
    const dispatch = useDispatch();

    //store
    const darkState = useSelector((state: RootState) => state.darkState.value);

    //state
    const { isOpeningOneBlog, setIsOpeningOneBlog } = useContext(IsOpeningOneBlogContext);
    const [blogContent, setBlogContent] = useState<string>("");
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);

    //queries
    const [triggerGetOneBlog, { data: blogData, error, isLoading }] =
      useLazyGetOneBlogQuery();
    //function

    const closeCommentSection = () => {
      setIsCommenting(false);
    };

    //useEffect
    useEffect(() => {
      const card_container = document.querySelector(
        `#card-container-${blogItem._id}`
      );
      const card = document.querySelector(`#card-${blogItem._id}`);
      const closeBtn = document.querySelector(`#close-btn-${blogItem._id}`);
      const handleCloseBlog = () => {
        if (card) {
          cardClick(card.id.split("-")[1], true);
        }
        setIsOpeningOneBlog(false);
        card?.classList.remove("tw-h-full");
        card?.classList.add("tw-h-[400px]");
        card?.classList.add("tw-rounded-2xl");
        card_container?.classList.remove("tw-h-screen");
      };
      const handleOpenBlog = () => {
        if (card && card_container && !isOpeningOneBlog) {
          setIsOpeningOneBlog(true);
          cardClick(card.id.split("-")[1], false);
          setTimeout(() => {
            triggerGetOneBlog(blogItem._id);
          }, 300);
          card.classList.add("tw-h-full");
          card.classList.remove("tw-h-[400px]");
          card_container.classList.add("tw-h-screen");
          card.classList.remove("tw-rounded-2xl");
        }
      };
      if (card) {
        card.addEventListener("click", handleOpenBlog);
      }
      if (closeBtn) {
        closeBtn.addEventListener("click", handleCloseBlog);
      }
      return () => {
        if (card) {
          card.removeEventListener("click", handleOpenBlog);
        }
        if (closeBtn) {
          closeBtn.removeEventListener("click", handleCloseBlog);
        }
      };
    }, []);

    useEffect(() => {
      var lastScrollTop = 0;
      const blog_container = document.getElementById(`blog-container`);
      const blog_header_container = document.getElementById(
        "blog-header-container"
      );
      if (blog_container) {
        blog_container.onscroll = () => {
          if (blog_container.scrollTop > lastScrollTop) {
            blog_header_container?.classList.add("tw-translate-y-[-100%]");
          } else if (blog_container.scrollTop < lastScrollTop) {
            blog_header_container?.classList.remove("tw-translate-y-[-100%]");
          }
          lastScrollTop =
            blog_container.scrollTop <= 0 ? 0 : blog_container.scrollTop;
        };
      }
    }, []);

    useEffect(() => {
      setBlogContent(blogData?.data.content);
      setComments(blogData?.data.commentIds);
    }, [blogData]);

    useEffect(() => {
      if(!isOpeningOneBlog){
        setIsCommenting(false)
      }
    }, [isOpeningOneBlog])

    return (
      <div
        className="tw-relative tw-w-full"
        id={"card-container-" + blogItem._id}
      >
        <div
          className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pt-10 tw-z-50 tw-duration-500"
          style={{
            display: isOpeningOneBlog ? "block" : "none",
          }}
          id="blog-header-container"
        >
          <header className="tw-flex tw-justify-between tw-items-center tw-relative">
            <div
              className="icon-button dark:tw-bg-white"
              id={"close-btn-" + blogItem._id}
            >
              {darkState ? (
                <IconArrow color="#392a48" />
              ) : (
                <IconArrow color="#FFF0F5" />
              )}
            </div>

            <div
              onClick={() => dispatch(toggle())}
              className="icon-button dark:tw-bg-white"
            >
              {darkState ? <IconMoon /> : <IconSun />}
            </div>
          </header>
        </div>
        <div
          className="tw-w-full tw-h-[400px] tw-rounded-2xl tw-absolute tw-top-0 tw-right-0 tw-cursor-pointer tw-shadow-2xl tw-duration-500 tw-z-30"
          style={{
            background: `url('${blogItem.background}')`,
            backgroundSize: "cover",
          }}
          id={"card-" + blogItem._id}
        >
          <p
            className="tw-absolute tw-top-1/2 tw-translate-x-1/2 -tw-translate-y-1/2 tw-right-1/2 tw-text-[30px]"
            style={{
              color: blogItem.theme === "dark" ? "#FFF0F5" : "#392a48",
            }}
          >
            {blogItem.title}
          </p>
        </div>
        <div
          style={{ display: isCommenting && isOpeningOneBlog ? "block" : "none" }}
        >
          <BlogCommentSection
            isCommenting={isCommenting}
            closeCommentSection={closeCommentSection}
            blogId={blogItem._id}
            comments={comments}
          />
        </div>
        <div
          className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-w-full tw-px-10 tw-pb-10 tw-z-50"
          style={{
            display: isOpeningOneBlog ? "block" : "none",
          }}
        >
          <footer
            className="tw-flex tw-justify-between tw-items-center tw-relative"
            style={{ display: !isCommenting ? "flex" : "none" }}
          >
            <div></div>
            <div
              onClick={() => setIsCommenting(true)}
              className="tw-w-8 tw-h-8 tw-rounded-full dark:tw-bg-white tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center tw-duration-500 tw-cursor-pointer hover:tw-bg-opacity-70"
            >
              {darkState ? (
                <IconComment strokeColor="#392a48" />
              ) : (
                <IconComment strokeColor="#FFF0F5" />
              )}
            </div>
          </footer>
        </div>
        <div
          style={{
            display: isOpeningOneBlog ? "block" : "none",
          }}
          className="tw-overflow-scroll tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-h-screen tw-z-40"
          id="blog-container"
        >
          <div className="tw-w-full tw-h-[calc(100vh_-_80px)] tw-bg-opacity-0"></div>
          <div className="tw-w-full tw-min-h-screen dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-rounded-t-xl">
            <div className="tw-w-full tw-p-10">
              <span
                className="tw-text-[14px] content-text tw-w-full"
                dangerouslySetInnerHTML={{ __html: blogContent }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BlogCard;
