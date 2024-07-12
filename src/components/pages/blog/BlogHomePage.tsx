import {
   useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { useGetBlogsQuery } from "@/api/blog";

const BlogHomePage = () => {
  const cardsContainer = useRef<HTMLDivElement>(null);
  const [blogList, setBlogList] = useState<Array<any>>([]);
  const [initialBlogList, setInitialBlogList] = useState<Array<any>>([]);

  //queries
  const { data: blogData } = useGetBlogsQuery({});
  const cardClick = (e: string, status: boolean) => {
    if (!status) {
      cardsContainer.current?.classList.remove("tw-pt-[100px]");
      cardsContainer.current?.classList.add("!tw-px-0");
      blogList.filter((item) => {
        if (item._id === e) {
          setBlogList([item]);
        }
      });
    } else {
      cardsContainer.current?.classList.add("tw-pt-[100px]");
      cardsContainer.current?.classList.remove("!tw-px-0");
      setBlogList(initialBlogList);
    }
  };

  useEffect(() => {
    setBlogList(blogData?.data);
    setInitialBlogList(blogData?.data);
  }, [blogData]);

  return (
    <div
      className="tw-pt-[100px] tw-px-10 tw-duration-500 tw-flex tw-flex-col tw-gap-y-10 tw-pb-10 dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff]"
      ref={cardsContainer}
    >
      {blogList?.map((item: any) => {
        return (
          <div className="tw-h-[400px]" key={item._id}>
            <BlogCard blogItem={item} cardClick={cardClick} />
          </div>
        );
      })}
    </div>
  );
};

export default BlogHomePage;
