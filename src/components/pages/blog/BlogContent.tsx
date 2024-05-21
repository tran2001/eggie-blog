import { useEffect, useState } from "react";
import data from "../../../../db.json";
import { useParams } from "react-router-dom";

interface IBlog {
  id: string;
  title: string;
  content: string;
  image: string;
  background: string;
}

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
  return (
    <div>
      {/* <div
        className={
          `tw-bg-[url('${blog?.background}')] tw-w-full tw-h-screen`
        }
      ></div> */}
      <div className={"tw-flex tw-justify-center"}>
        <div className="tw-w-full tw-flex tw-flex-col tw-mt-[50px] tw-mb-[100px] tw-max-w-[600px]">
          <div className="tw-flex tw-flex-col tw-w-full">
            <div className="tw-flex tw-flex-col tw-items-center">
              <span className="tw-text-[30px]">{blog?.title}</span>
              <span className="tw-text-[14px] content-text">
                {blog?.content}
              </span>
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
  );
};

export default BlogContent;
