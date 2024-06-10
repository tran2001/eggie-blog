import { useCallback, useEffect, useRef, useState } from "react";
import data from "../../../../db.json";
import { useParams } from "react-router-dom";
import { IBlog } from "@/interfaces/common.interfaces";

const BlogContent = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState<string | undefined>("");
  const [blog, setBlog] = useState<IBlog | undefined>();

  const getBlog = async () => {
    const blog = data["blogs"].find((item) => item.id === postId);
    setBlog(blog);
  };

  useEffect(() => {
    setPostId(id);
  }, [id]);

  useEffect(() => {
    getBlog();
  }, [postId]);

  //  DOM
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
  const contentBackground = useCallback((node: any) => {
    if (node) {
      node.addEventListener("scroll", () => {
        console.log(123);
      });
    }
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
            <div
              className="tw-flex tw-justify-center tw-p-10 dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff] tw-rounded-t-[50px] tw-overflow-scroll tw-absolute -tw-translate-y-[500px]"
              ref={contentBackground}
            >
              <div className="tw-w-full tw-flex tw-flex-col tw-mb-[100px] tw-max-w-[600px]">
                <div className="tw-flex tw-flex-col tw-w-full tw-items-center">
                  <div className="tw-flex tw-flex-col tw-items-center tw-w-full">
                    <span
                      className="tw-text-[14px] content-text tw-w-full"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></span>
                  </div>
                  <img
                    key={blog?.id}
                    className="tw-object-cover tw-rounded-[16px] tw-mt-5"
                    src={blog?.image}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogContent;
