import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { getBlogs } from "@/api/blog";

const BlogHomePage = () => {
  const cardsContainer = useRef<HTMLDivElement>(null);
  const [blogList, setBlogList] = useState<Array<any>>([]);
  const cardClick = (e: string) => {
    if (cardsContainer.current) {
      cardsContainer.current.classList.remove("tw-pt-[100px]");
      cardsContainer.current.classList.add("!tw-px-0");
    }
    blogList.filter((item) => {
      if (item._id === e) {
        setBlogList([item]);
      }
    });
  };

  const fetchBlogs = async () => {
    try {
      const res: any = await getBlogs();
      setBlogList(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      className="tw-pt-[100px] tw-px-10 tw-duration-300 tw-flex tw-flex-col tw-gap-y-10 tw-pb-10 dark:tw-bg-[#1e1e1e] tw-bg-[#ffffff]"
      ref={cardsContainer}
    >
      {blogList.map((item) => {
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
